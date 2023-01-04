import React from "react";
import { useMutation } from "@apollo/client";
import { ALL_POSTS, REMOVE_POSTS } from "../apollo/todos";

export default function PostsList({ data, refetch, setValue, setChangeRest }) {
  const [deletePost] = useMutation(REMOVE_POSTS);

  const handleEdit = (value) => {
    setChangeRest(true);
    setValue("title", value.title);
    setValue("views", value.views);
    setValue("userId", value.id);
  };
  const onDelete = (id) => {
    deletePost({
      variables: {
        id,
      },
    });
    refetch(ALL_POSTS);
  };
  return (
    <div>
      <div className="flex justify-center items-center flex-wrap">
        {data?.allPosts?.map((allPost) => (
          <div key={allPost.id} className="w-1/6 border mb-2 mr-4 p-4">
            <div>
              <span className="border p-2">{allPost.id}</span>
              <p className="my-3">
                <span className="font-semibold">Title:</span> {allPost.title}
              </p>
              <p className="my-3">
                <span className="font-semibold">Views:</span> {allPost.views}
              </p>
            </div>
            <div className="flex">
              <button
                onClick={() => handleEdit(allPost)}
                className="border px-5 py-2 mr-2 rounded-md text-white bg-cyan-500 hover:bg-cyan-600 "
              >
                Edit
              </button>

              <button
                onClick={() => onDelete(allPost.id)}
                className="border px-5 py-2 rounded-md bg-red-500 text-white hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
