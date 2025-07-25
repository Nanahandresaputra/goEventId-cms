import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { serviceApi } from "../../services/services";
import { endpoints } from "../../services/endpoint";
import { httpMethod } from "../../services/method";

const TYPE = {
  POST_CHECKIN: "post/check-in",
};

const initialState = {
  isLoadingCheckIn: false,
  isErrorCheckIn: false,
};

export const checkInAction = createAsyncThunk(
  TYPE.POST_CHECKIN,
  async ({ body }) => {
    return await new Promise((resolve, reject) => {
      serviceApi({
        withToken: true,
        endpoint: endpoints.checkIn,
        method: httpMethod.post,
        body,
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

const checkInSlice = createSlice({
  name: "checkin",
  initialState,
  reducers: {},
  extraReducers(builder) {
    //=================== CASE POST //===================
    builder.addCase(checkInAction.pending, (state) => {
      state.isLoadingCheckIn = true;
      state.isErrorCheckIn = false;
    });
    builder.addCase(checkInAction.fulfilled, (state) => {
      state.isLoadingCheckIn = false;
      state.isErrorCheckIn = false;
    });
    builder.addCase(checkInAction.rejected, (state) => {
      state.isLoadingCheckIn = false;
      state.isErrorCheckIn = true;
    });
  },
});

export default checkInSlice.reducer;
