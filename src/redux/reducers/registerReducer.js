import {
  ADD_EMAIL,
  ADD_PASSWORD,
  ADD_FNAME,
  ADD_LNAME,
  ADD_USERNAME,
} from "../actions/registerActions";

const registerState = {
  user: {
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  },
};

export const registerReducer = (state = registerState, action) => {
  switch (action.type) {
    case ADD_FNAME:
      return {
        ...state,
        user: {
          ...state.user,
          firstName: action.payload,
        },
      };
    case ADD_LNAME:
      return {
        ...state,
        user: {
          ...state.user,
          lastName: action.payload,
        },
      };
    case ADD_USERNAME:
      return {
        ...state,
        user: {
          ...state.user,
          username: action.payload,
        },
      };
    case ADD_EMAIL:
      return {
        ...state,
        user: {
          ...state.user,
          email: action.payload,
        },
      };
    case ADD_PASSWORD:
      return {
        ...state,
        user: {
          ...state.user,
          password: action.payload,
        },
      };

    default:
      return state;
  }
};
