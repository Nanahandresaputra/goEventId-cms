import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authLoginReducer from "./features/auth/login.js";

const rootReducer = combineReducers({
  authLogin: authLoginReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
