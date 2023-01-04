import { gql } from "@apollo/client";

export const ALL_POSTS = gql`
  query AllPosts {
    allPosts {
      id
      title
      views
    }
  }
`;
export const ADD_POSTS = gql`
  mutation addPost($title: String!, $views: Int!, $userId: ID!) {
    createPost(title: $title, views: $views, user_id: $userId) {
      id
      title
      user_id
    }
  }
`;
export const REMOVE_POSTS = gql`
  mutation deletePost($id: ID!) {
    removePost(id: $id) {
      id
    }
  }
`;
export const UPDATE_POSTS = gql`
  mutation upDatePost($id: ID!, $title: String, $views: Int, $user_id: ID) {
    updatePost(id: $id, title: $title, views: $views, user_id: $user_id) {
      id
      title
      views
      user_id
    }
  }
`;
