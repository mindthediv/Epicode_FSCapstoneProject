import {
  GET_POSTS,
  ADD_POSTS,
  GET_LOGGED_POSTS,
  GET_USER_POSTS,
  GET_LIKES,
} from "../actions/postActions";

const postsState = {
  allPosts: [],
  loggedPosts: [],
  userPosts: [],
  postLikes: [],
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
    case GET_LIKES:
      return {
        ...state,
        postLikes: action.payload,
      };
    default:
      return state;
  }
};
