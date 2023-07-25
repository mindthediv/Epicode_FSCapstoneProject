import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

export const API_POSTS = "http://localhost:8080/api/feed/posts";
export const GET_POSTS = "GET_POSTS";
export const ADD_POSTS = "ADD_POSTS";
export const GET_LOGGED_POSTS = "GET_LOGGED_POSTS";
export const GET_USER_POSTS = "GET_USER_POSTS";
export const TRANSFILE = "TRANSFILE";
export const GET_LIKES = "GET_LIKES";

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
        });
      } else {
        toast.error(
          "fetchFailed: Sembra essersi verificato un errore, attendi un istante e prova a ricaricare la pagina.",
          {
            position: "top-center",
            autoClose: 2000,
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
//DELETE POST
export const deletePost = (id) => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(API_POSTS + "/" + id, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + getState().logged.loggedUser.auth,
        },
      });
      if (response.ok) {
        const data = await response.json();
        toast.success("Post eliminato", {
          position: "top-center",
          autoClose: 2000,
          onClose: () => window.location.reload(),
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        return data;
      } else {
        toast.error(
          "Sembra essersi verificato un errore, attendi un istante e prova a ricaricare la pagina.",
          {
            position: "top-center",
            autoClose: 2000,
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
          payload: postsData.slice(0, 100).reverse(),
          // .slice(0, 100).reverse(),
        });
      } else {
        toast.error(
          "Errore nel caricamento dei post. Prova a ricaricare la pagina.",
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
//GET OTHER USER POST
export const getUserPosts = (id) => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(API_POSTS + "/" + id, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + getState().logged.loggedUser.auth,
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      if (response.ok) {
        const postsData = await response.json();

        dispatch({
          type: GET_USER_POSTS,
          payload: postsData.slice(0, 100).reverse(),
          // .slice(0, 100).reverse(),
        });
      } else {
        toast.error(
          "Errore nel caricamento dei post. Prova a ricaricare la pagina.",
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
        toast.error("Errore nel upload del post. Riprova.", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

//LIKES PUT
export const putLike = (id) => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(API_POSTS + "/" + id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + getState().logged.loggedUser.auth,
        },
        body: JSON.stringify({
          lk: getState().logged.loggedUser.id,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        return data;
      }
    } catch (error) {
      console.log(error);
    }
  };
};
