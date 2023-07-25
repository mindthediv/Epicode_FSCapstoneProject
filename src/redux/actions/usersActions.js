import { logOut } from "./loggedActions";

export const API_USERS = "http://localhost:8080/api/users";

export const CACHE_USER = "CACHE_USER";

export const cacheUser = (id) => {
  return async (dispatch, getState) => {
    try {
      let resp = await fetch(API_USERS + "/" + id, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + getState().logged.loggedUser.auth,
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      if (resp.ok) {
        let user = await resp.json();

        dispatch({
          type: CACHE_USER,
          payload: user,
        });
        return user;
      } else {
        console.log("Errore nel caricamento dell'utente");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteUser = (id) => {
  return async (dispatch, getState) => {
    try {
      let resp = await fetch(API_USERS + "/" + id, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + getState().logged.loggedUser.auth,
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      if (resp.ok) {
        let data = await resp.json();

        return data;
      } else {
        console.log("Si è verificato un errore nell'eliminazione dell'utente");
      }
    } catch (error) {
      console.log(
        "Si è verificato un errore nell'eliminazione dell'utente: " + error
      );
    }
  };
};

//FOLLOW PUT
export const putFollow = (id) => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(API_USERS + "/follow/" + id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + getState().logged.loggedUser.auth,
        },
        body: JSON.stringify({
          payFollow: getState().logged.loggedUser.id,
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
