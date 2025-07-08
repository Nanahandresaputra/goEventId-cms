import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { serviceApi } from "../../services/services";
import { endpoints } from "../../services/endpoint";
import { httpMethod } from "../../services/method";

const TYPE = {
  GET_USERS: "get/users",
  POST_USERS: "post/users",
  PATCH_USERS: "patch/users",
  DELETE_USERS: "delete/users",
};

const initialState = {
  usersList: [],
  isLoadingGet: false,
  isErrorGet: false,
};

export const getUsersAction = createAsyncThunk(TYPE.GET_USERS, async () => {
  return await new Promise((resolve, reject) => {
    serviceApi({
      withToken: true,
      endpoint: endpoints.user,
      method: httpMethod.get,
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
});

const acaraSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getUsersAction.pending, (state) => {
      state.isLoadingGet = true;
      state.isError = false;
    });
    builder.addCase(getUsersAction.fulfilled, (state, action) => {
      state.isLoadingGet = false;
      state.isError = false;
      state.usersList = action.payload;
    });
    builder.addCase(getUsersAction.rejected, (state) => {
      state.isLoadingGet = false;
      state.isError = true;
    });
  },
});

export default acaraSlice.reducer;
