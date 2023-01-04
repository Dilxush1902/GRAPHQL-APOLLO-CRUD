import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ADD_POSTS, ALL_POSTS, UPDATE_POSTS } from "./apollo/todos";
import "./App.css";
import PostsList from "./components/PostsList";

function App() {
  const { data, loading, refetch } = useQuery(ALL_POSTS);
  const [changeRest, setChangeRest] = useState(false);
  const [addPost] = useMutation(ADD_POSTS);
  const [upDatePost] = useMutation(UPDATE_POSTS);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    defaultValues: {
      title: null,
      views: null,
      userId: null,
    },
  });

  const onSubmit = (value) => {
    if (changeRest) {
      upDatePost({
        variables: {
          id: Number(value.userId),
          title: value.title,
          userId: value.userId,
          views: Number(value.views),
        },
      });
      setChangeRest(false);
    } else {
      addPost({
        variables: {
          title: value.title,
          userId: value.userId,
          views: Number(value.views),
        },
      });
    }
    reset();
    refetch(ALL_POSTS);
  };

  return (
    <div>
      <h1 className="text-center my-10">
        <span className="text-[#E00098] font-semibold text-4xl tracking-widest mr-3">GRAPHQL</span> 
        <span className="text-[#2582A1]  font-semibold text-4xl tracking-widest">APOLLO</span>
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="my-4 flex justify-center items-center"
      >
        <div className="my-2 mr-4">
          <div>
            <span className="font-semibold">Title:</span>
          </div>
          <input
            className="border p-2  rounded-md "
            type="text"
            {...register("title", { required: "Required !" })}
          />
          <p>
            {errors.title && (
              <span className="text-red-600">{errors.title.message}</span>
            )}
          </p>
        </div>
        <div className="my-3 mr-4">
          <div>
            <span className="font-semibold">Views:</span>
          </div>
          <input
            className="border p-2  rounded-md"
            type="number"
            {...register("views", { required: "Required!" })}
          />
          <p>
            {errors.views && (
              <span className="text-red-600">{errors.views.message}</span>
            )}
          </p>
        </div>
        <div className="my-3 mr-4">
          <div>
            <span className="font-semibold">Id:</span>
          </div>
          <input
            className="border p-2   rounded-md"
            type="number"
            {...register("userId", { required: "Required!" })}
          />
          <p>
            {errors.userId && (
              <span className="text-red-600">{errors.userId.message}</span>
            )}
          </p>
        </div>
        <div className="mt-5">
          <button className="border px-8 py-2 text-white  rounded-md bg-green-500">
            Send
          </button>
        </div>
      </form>
      <div>
        {loading && <h1 className="text-center text-3xl">Loading...</h1>}
        {data?.allPosts?.length ? (
          <PostsList
            setValue={setValue}
            setChangeRest={setChangeRest}
            data={data}
            refetch={refetch}
          />
        ) : (
          !loading && <h1 className="text-center text-3xl mt-7">Empty</h1>
        )}
      </div>
    </div>
  );
}

export default App;
