import {
  GET_POSTS,
  ADD_POSTS,
  GET_LOGGED_POSTS,
  GET_USER_POSTS,
} from "../actions/postActions";

const postsState = {
  allPosts: [],
  loggedPosts: [],
  userPosts: [],
};

export const postsReducer = (state = postsState, action) => {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        allPosts: action.payload.sort((a, b) => {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          return dateB - dateA;
        }),
      };
    case GET_LOGGED_POSTS:
      return {
        ...state,
        loggedPosts: action.payload.sort((a, b) => {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          return dateB - dateA;
        }),
      };
    case GET_USER_POSTS:
      return {
        ...state,
        userPosts: action.payload.sort((a, b) => {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          return dateB - dateA;
        }),
      };

    default:
      return state;
  }
};
