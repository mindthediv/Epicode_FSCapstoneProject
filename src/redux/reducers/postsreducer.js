import { GET_POSTS, ADD_POSTS, GET_LOGGED_POSTS } from "../actions/postActions";

const postsState = {
  allPosts: [],
  loggedPosts: [],
};

export const postsReducer = (state = postsState, action) => {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        allPosts: action.payload,
      };
    case GET_LOGGED_POSTS:
      return {
        ...state,
        loggedPosts: action.payload,
      };
    default:
      return state;
  }
};
