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

  isLoadingOn: false,
  isErrorOn: false,
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

export const createAcaraAction = createAsyncThunk(
  TYPE.POST_ACARA,
  async ({ body }, { dispatch }) => {
    return await new Promise((resolve, reject) => {
      serviceApi({
        withToken: true,
        endpoint: endpoints.acara,
        method: httpMethod.post,
        body,
      })
        .then((res) => {
          dispatch(getAcaraAction()).catch(() => {});
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
);

export const updateAcaraAction = createAsyncThunk(
  TYPE.PATCH_ACARA,
  async ({ body, acaraId }, { dispatch }) => {
    return await new Promise((resolve, reject) => {
      serviceApi({
        withToken: true,
        endpoint: endpoints.acara,
        method: httpMethod.patch,
        body,
        optionalHeaders: { id: acaraId },
      })
        .then((res) => {
          dispatch(getAcaraAction()).catch(() => {});
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
);

const acaraSlice = createSlice({
  name: "acara",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getAcaraAction.pending, (state) => {
      state.isLoadingGet = true;
      state.isErrorGet = false;
    });
    builder.addCase(getAcaraAction.fulfilled, (state, action) => {
      state.isLoadingGet = false;
      state.isErrorGet = false;
      state.acaraList = action.payload;
    });
    builder.addCase(getAcaraAction.rejected, (state) => {
      state.isLoadingGet = false;
      state.isErrorGet = true;
    });

    builder.addCase(createAcaraAction.pending, (state) => {
      state.isLoadingOn = true;
      state.isErrorOn = false;
    });
    builder.addCase(createAcaraAction.fulfilled, (state) => {
      state.isLoadingOn = false;
      state.isErrorOn = false;
    });
    builder.addCase(createAcaraAction.rejected, (state) => {
      state.isLoadingOn = false;
      state.isErrorOn = true;
    });

    builder.addCase(updateAcaraAction.pending, (state) => {
      state.isLoadingOn = true;
      state.isErrorOn = false;
    });
    builder.addCase(updateAcaraAction.fulfilled, (state) => {
      state.isLoadingOn = false;
      state.isErrorOn = false;
    });
    builder.addCase(updateAcaraAction.rejected, (state) => {
      state.isLoadingOn = false;
      state.isErrorOn = true;
    });
  },
});

export default acaraSlice.reducer;
