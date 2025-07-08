import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { endpoints } from "../../services/endpoint";
import { serviceApi } from "../../services/services";
import { httpMethod } from "../../services/method";

const initialState = {
  isLoading: false,
  isError: false,
};

export const loginAction = createAsyncThunk("auth/login", async ({ body }) => {
  return await new Promise((resolve, reject) => {
    serviceApi({
      body,
      withToken: false,
      endpoint: endpoints.authLogin,
      method: httpMethod.post,
    })
      .then((res) => {
        localStorage.setItem("token", res?.token);
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
});

export const logoutAction = createAsyncThunk("auth/logout", async () => {
  return await new Promise((resolve, reject) => {
    serviceApi({
      endpoint: endpoints.authLogout,
      method: httpMethod.delete,
    })
      .then((res) => {
        localStorage.clear();
        window.location.href = "/login";
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
});

const authLoginSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(loginAction.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(loginAction.fulfilled, (state) => {
      state.isLoading = false;
      state.isError = false;
    });
    builder.addCase(loginAction.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });

    builder.addCase(logoutAction.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(logoutAction.fulfilled, (state) => {
      state.isLoading = false;
      state.isError = false;
    });
    builder.addCase(logoutAction.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export default authLoginSlice.reducer;
