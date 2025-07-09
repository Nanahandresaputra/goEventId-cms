import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/auth.js";
import acaraReducer from "./features/management/acara.js";
import tiketAcaraReducer from "./features/management/tiket-acara.js";
import penyelenggaraReducer from "./features/management/penyelenggara.js";
import usersReducer from "./features/management/users.js";
import penjualanReducer from "./features/reporting/penjualan.js";
import kategoriReducer from "./features/management/kategori.js";

const rootReducer = combineReducers({
  auth: authReducer,
  acara: acaraReducer,
  tiketAcara: tiketAcaraReducer,
  penyelenggara: penyelenggaraReducer,
  users: usersReducer,
  penjualan: penjualanReducer,
  kategori: kategoriReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
