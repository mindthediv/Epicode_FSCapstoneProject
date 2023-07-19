import { CACHE_USER } from "../actions/usersActions";

const usersState = {
  user: {},
};

export const usersReducer = (state = usersState, action) => {
  switch (action.type) {
    case CACHE_USER:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return usersState;
  }
};
