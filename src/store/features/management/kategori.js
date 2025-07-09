import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { serviceApi } from "../../services/services";
import { endpoints } from "../../services/endpoint";
import { httpMethod } from "../../services/method";

const TYPE = {
  GET_KATEGORI: "get/kategori",
};

const initialState = {
  kategoriList: [],
  isLoadingGet: false,
  isErrorGet: false,
};

export const getKategoriAction = createAsyncThunk(
  TYPE.GET_KATEGORI,
  async () => {
    return await new Promise((resolve, reject) => {
      serviceApi({
        withToken: true,
        endpoint: endpoints.kategori,
        method: httpMethod.get,
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

const kategoriSlice = createSlice({
  name: "kategori",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getKategoriAction.pending, (state) => {
      state.isLoadingGet = true;
      state.isError = false;
    });
    builder.addCase(getKategoriAction.fulfilled, (state, action) => {
      state.isLoadingGet = false;
      state.isError = false;
      state.kategoriList = action.payload;
    });
    builder.addCase(getKategoriAction.rejected, (state) => {
      state.isLoadingGet = false;
      state.isError = true;
    });
  },
});

export default kategoriSlice.reducer;
