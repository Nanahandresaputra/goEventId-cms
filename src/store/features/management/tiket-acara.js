import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { serviceApi } from "../../services/services";
import { endpoints } from "../../services/endpoint";
import { httpMethod } from "../../services/method";

const TYPE = {
  GET_TIKET_ACARA: "get/tiket-acara",
  POST_TIKET_ACARA: "post/tiket-acara",
  PATCH_TIKET_ACARA: "patch/tiket-acara",
  DELETE_TIKET_ACARA: "delete/tiket-acara",
};

const initialState = {
  tiketAcaraList: [],
  isLoadingGet: false,
  isErrorGet: false,
};

export const getTiketAcaraAction = createAsyncThunk(
  TYPE.GET_TIKET_ACARA,
  async ({ acara_id }) => {
    return await new Promise((resolve, reject) => {
      serviceApi({
        withToken: true,
        endpoint: endpoints.tiketAcara,
        method: httpMethod.get,
        optionalHeaders: { acara_id },
      })
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
);

const acaraSlice = createSlice({
  name: "tiket-acara",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getTiketAcaraAction.pending, (state) => {
      state.isLoadingGet = true;
      state.isError = false;
    });
    builder.addCase(getTiketAcaraAction.fulfilled, (state, action) => {
      state.isLoadingGet = false;
      state.isError = false;
      state.tiketAcaraList = action.payload;
    });
    builder.addCase(getTiketAcaraAction.rejected, (state) => {
      state.isLoadingGet = false;
      state.isError = true;
    });
  },
});

export default acaraSlice.reducer;
