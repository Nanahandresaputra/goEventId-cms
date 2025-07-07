import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authLoginApi } from "../../services/auth/login";

const initialState = {
  isLoading: false,
  isError: false,
};

export const loginAction = createAsyncThunk("auth/login", async ({ body }) => {
  return await new Promise((resolve, reject) => {
    authLoginApi({ body })
      .then((res) => {
        console.log("res action --->", res);
        resolve(res.data);
      })
      .catch((err) => {
        console.log("res action err --->", err);
        reject(err);
      });
  });
});

const authLoginSlice = createSlice({
  name: "authLogin",
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
  },
});

export default authLoginSlice.reducer;
