import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { serviceApi } from "../../services/services";
import { endpoints } from "../../services/endpoint";
import { httpMethod } from "../../services/method";

const TYPE = {
  GET_ACARA: "get/acara",
  POST_ACARA: "post/acara",
  PATCH_ACARA: "patch/acara",
  DELETE_ACARA: "delete/acara",
};

const initialState = {
  acaraList: [],
  isLoadingGet: false,
  isErrorGet: false,
};

export const getAcaraAction = createAsyncThunk(TYPE.GET_ACARA, async () => {
  return await new Promise((resolve, reject) => {
    serviceApi({
      withToken: true,
      endpoint: endpoints.acara,
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
  name: "acara",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getAcaraAction.pending, (state) => {
      state.isLoadingGet = true;
      state.isError = false;
    });
    builder.addCase(getAcaraAction.fulfilled, (state, action) => {
      state.isLoadingGet = false;
      state.isError = false;
      state.acaraList = action.payload;
    });
    builder.addCase(getAcaraAction.rejected, (state) => {
      state.isLoadingGet = false;
      state.isError = true;
    });
  },
});

export default acaraSlice.reducer;
