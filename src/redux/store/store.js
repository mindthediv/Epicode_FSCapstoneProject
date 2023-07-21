import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import { registerReducer } from "../reducers/registerReducer";
import { loggedReducer } from "../reducers/loggedReducer";
import { postsReducer } from "../reducers/postsreducer";
import { usersReducer } from "../reducers/usersReducer";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  stateReconciler: autoMergeLevel2,
  // da implementare ipotetica logica di "ricordami" in cui se spuntato il log persisterà.
  //oppure logout automatico alla chiusura della sessione t/f
  blacklist: ["register", "posts"],
};

const reducers = combineReducers({
  register: registerReducer,
  logged: loggedReducer,
  posts: postsReducer,
  users: usersReducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
});

export default store;
