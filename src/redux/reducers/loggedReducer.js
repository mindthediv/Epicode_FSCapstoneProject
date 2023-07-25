import {
  LOG_IN,
  LOG_OUT,
  FILL_CREDENTIALS,
  ADD_PROFILE_PIC,
} from "../actions/loggedActions";

const LoggedState = {
  isLogged: false,
  loggedUser: {
    id: null,
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    auth: "",
    profileImg: "",
    backgroundImg: "",
  },
};

export const loggedReducer = (state = LoggedState, action) => {
  switch (action.type) {
    case LOG_IN:
      return {
        ...state,
        isLogged: action.payload,
      };
    case LOG_OUT:
      return {
        isLogged: action.payload,
      };
    case FILL_CREDENTIALS:
      return {
        ...state,
        loggedUser: action.payload,
      };
    case ADD_PROFILE_PIC:
      return {
        ...state,
        loggedUser: { ...state.loggedUser, profileImg: action.payload },
      };

    default:
      return state;
  }
};
