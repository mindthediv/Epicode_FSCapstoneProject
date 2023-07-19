import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

export const API_POSTS = "http://localhost:8080/api/feed/posts";
export const GET_POSTS = "GET_POSTS";
export const ADD_POSTS = "ADD_POSTS";
export const GET_LOGGED_POSTS = "GET_LOGGED_POSTS";

// export const ADD_POST_TEXT = "ADD_POST_TEXT";

//GET ALL POST
export const getAllPosts = () => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(API_POSTS, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + getState().logged.loggedUser.auth,
        },
      });
      if (response.ok) {
        const postsData = await response.json();

        dispatch({
          type: GET_POSTS,
          payload: postsData,
          // .reverse().slice(0, 100).reverse(),
        });
      } else {
        toast.error(
          "fetchFailed: Sembra essersi verificato un errore, attendi un istante e prova a ricaricare la pagina.",
          {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          }
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
};
//GET LOGGED USER POST
export const getLoggedPosts = (id) => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(API_POSTS + "/me", {
        method: "POST",
        body: JSON.stringify(id),
        headers: {
          Authorization: "Bearer " + getState().logged.loggedUser.auth,
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      if (response.ok) {
        const postsData = await response.json();

        dispatch({
          type: GET_LOGGED_POSTS,
          payload: postsData,
          // .reverse().slice(0, 100).reverse(),
        });
      } else {
        toast.error(
          "fetchFailed: Sembra essersi verificato un errore, attendi un istante e prova a ricaricare la pagina.",
          {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          }
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
};
//POST POSTS
export const postAPost = (postDto) => {
  return async (dispatch, getState) => {
    try {
      let resp = await fetch(API_POSTS, {
        method: "POST",
        body: JSON.stringify(postDto),
        headers: {
          Authorization: "Bearer " + getState().logged.loggedUser.auth,
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      if (resp.ok) {
        let newExpe = await resp.json();
      } else {
        toast.error(
          "fetchFailed: Sembra essersi verificato un errore, attendi un istante e prova a ricaricare la pagina.",
          {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          }
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
};
