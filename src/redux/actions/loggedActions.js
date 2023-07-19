const API_AUTH = "http://localhost:8080/api/auth";

export const LOG_IN = "LOG_IN";
export const LOG_OUT = "LOG_OUT";
export const FILL_CREDENTIALS = "FILL_CREDENTIALS";
export const ADD_PROFILE_PIC = "ADD_PROFILE_PIC";
export const ADD_BACKGROUND_PIC = "ADD_BACKGROUND_PIC";

export const logIn = () => {
  return {
    type: LOG_IN,
    payload: true,
  };
};
export const logOut = () => {
  return {
    type: LOG_OUT,
    payload: false,
  };
};
export const fillCredentials = (user) => {
  return {
    type: FILL_CREDENTIALS,
    payload: user,
  };
};
export const getProfilePic = (fileName) => {
  return {
    type: ADD_PROFILE_PIC,
    payload: fileName,
  };
};
export const getBackgroundPic = (fileName) => {
  return {
    type: ADD_BACKGROUND_PIC,
    payload: fileName,
  };
};
