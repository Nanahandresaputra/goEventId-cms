import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { serviceApi } from "../../services/services";
import { endpoints } from "../../services/endpoint";
import { httpMethod } from "../../services/method";

const TYPE = {
  GET_PROVINSI: "get/provinsi",
  GET_KABUPATEN_KOTA: "get/kabupatenkota",
};

const initialState = {
  provinsiList: [],
  isLoadingGetProv: false,
  isErrorGetProv: false,

  kabupatenkotaList: [],
  isLoadingGetKab: false,
  isErrorGetKab: false,
};

export const getProvinsiAction = createAsyncThunk(
  TYPE.GET_PROVINSI,
  async () => {
    return await new Promise((resolve, reject) => {
      serviceApi({
        withToken: true,
        endpoint: endpoints.provinsi,
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

export const getKabupateKotaAction = createAsyncThunk(
  TYPE.GET_KABUPATEN_KOTA,
  async ({ provinsiId }) => {
    return await new Promise((resolve, reject) => {
      serviceApi({
        withToken: true,
        endpoint: endpoints.kabupatenkota,
        method: httpMethod.get,
        optionalHeaders: { provinsi_id: provinsiId },
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

const regionalSlice = createSlice({
  name: "regional",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getProvinsiAction.pending, (state) => {
      state.isLoadingGetProv = true;
      state.isErrorGetProv = false;
    });
    builder.addCase(getProvinsiAction.fulfilled, (state, action) => {
      state.isLoadingGetProv = false;
      state.isErrorGetProv = false;
      state.provinsiList = action.payload;
    });
    builder.addCase(getProvinsiAction.rejected, (state) => {
      state.isLoadingGetProv = false;
      state.isErrorGetProv = true;
    });

    builder.addCase(getKabupateKotaAction.pending, (state) => {
      state.isLoadingGetKab = true;
      state.isErrorGetKab = false;
    });
    builder.addCase(getKabupateKotaAction.fulfilled, (state, action) => {
      state.isLoadingGetKab = false;
      state.isErrorGetKab = false;
      state.kabupatenkotaList = action.payload;
    });
    builder.addCase(getKabupateKotaAction.rejected, (state) => {
      state.isLoadingGetKab = false;
      state.isErrorGetKab = true;
    });
  },
});

export default regionalSlice.reducer;
