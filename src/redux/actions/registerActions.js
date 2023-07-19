import { async } from "q";
import { fillCredentials, logIn } from "./loggedActions";
import { toast } from "react-toastify";

const API_AUTH = "http://localhost:8080/api/auth";

export const ADD_FNAME = "ADD_FNAME";
export const ADD_LNAME = "ADD_LNAME";
export const ADD_USERNAME = "ADD_USERNAME";
export const ADD_EMAIL = "ADD_EMAIL";
export const ADD_PASSWORD = "ADD_PASSWORD";

export const handleFirstName = (fn) => {
  return {
    type: ADD_FNAME,
    payload: fn,
  };
};
export const handleLastName = (ln) => {
  return {
    type: ADD_LNAME,
    payload: ln,
  };
};
export const handleUsername = (un) => {
  return {
    type: ADD_USERNAME,
    payload: un,
  };
};
export const handleEmail = (e) => {
  return {
    type: ADD_EMAIL,
    payload: e,
  };
};
export const handlePassword = (p) => {
  return {
    type: ADD_PASSWORD,
    payload: p,
  };
};
export const postRegister = (user) => {
  return async (dispatch, getState) => {
    try {
      let response = await fetch(API_AUTH + "/register", {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      if (response.ok) {
        let newUser = await response.json();
        console.log(newUser);
      } else {
        alert("fetch failed");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

// export const putRegister = (user) => {
//   return async (dispatch, getState) => {
//     try {
//       let response = await fetch(API_AUTH + "/register", {
//         method: "PUT",
//         body: JSON.stringify(user),
//         headers: {
//           "Content-type": "application/json; charset=UTF-8",
//         },
//       });
//       if (response.ok) {
//         let newUser = await response.json();
//         console.log(newUser);
//         toastBean();
//       } else {
//         alert("fetch failed");
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };
// };

//toastifier
const toastBean = () => {
  toast.success("Modifiche effettuate con successo! ", {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};

export const postLogin = (user) => {
  return async (dispatch, getState) => {
    try {
      let response = await fetch(API_AUTH + "/login", {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      if (response.ok) {
        let newUser = await response.json();
        dispatch(fillCredentials(newUser));
        dispatch(logIn());
      } else {
        alert("fetch failed");
      }
    } catch (error) {
      console.log(error);
    }
  };
};
