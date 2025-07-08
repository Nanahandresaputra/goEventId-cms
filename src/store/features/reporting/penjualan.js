import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { serviceApi } from "../../services/services";
import { endpoints } from "../../services/endpoint";
import { httpMethod } from "../../services/method";

const TYPE = {
  GET_PENJUALAN: "get/penjualan",
};

const initialState = {
  penjualanList: [],
  isLoadingGet: false,
  isErrorGet: false,
};

export const getReportingPenjualanAction = createAsyncThunk(
  TYPE.GET_PENJUALAN,
  async () => {
    return await new Promise((resolve, reject) => {
      serviceApi({
        withToken: true,
        endpoint: endpoints.reportin,
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

const acaraSlice = createSlice({
  name: "reporting-penjualan",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getReportingPenjualanAction.pending, (state) => {
      state.isLoadingGet = true;
      state.isError = false;
    });
    builder.addCase(getReportingPenjualanAction.fulfilled, (state, action) => {
      state.isLoadingGet = false;
      state.isError = false;
      state.penjualanList = action.payload;
    });
    builder.addCase(getReportingPenjualanAction.rejected, (state) => {
      state.isLoadingGet = false;
      state.isError = true;
    });
  },
});

export default acaraSlice.reducer;
