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

  isLoadingOn: false,
  isErrorOn: false,
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

export const createTiketAcaraAction = createAsyncThunk(
  TYPE.POST_TIKET_ACARA,
  async ({ body }, { dispatch }) => {
    return await new Promise((resolve, reject) => {
      serviceApi({
        withToken: true,
        endpoint: endpoints.tiketAcara,
        method: httpMethod.post,
        body,
      })
        .then((res) => {
          dispatch(getTiketAcaraAction({ acara_id: body.acara_id })).catch(
            () => {}
          );
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
);

export const updateTiketAcaraAction = createAsyncThunk(
  TYPE.PATCH_TIKET_ACARA,
  async ({ body, tiketAcaraId }, { dispatch }) => {
    return await new Promise((resolve, reject) => {
      serviceApi({
        withToken: true,
        endpoint: endpoints.tiketAcara,
        method: httpMethod.patch,
        body,
        optionalHeaders: { id: tiketAcaraId },
      })
        .then((res) => {
          console.log("trigger --- patch", body);
          dispatch(getTiketAcaraAction({ acara_id: body.acara_id })).catch(
            () => {}
          );
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
);

export const deleteTiketAcaraAction = createAsyncThunk(
  TYPE.DELETE_TIKET_ACARA,
  async ({ tiketAcaraId, acaraId }, { dispatch }) => {
    return await new Promise((resolve, reject) => {
      serviceApi({
        withToken: true,
        endpoint: endpoints.tiketAcara,
        method: httpMethod.delete,
        optionalHeaders: { id: tiketAcaraId },
      })
        .then((res) => {
          dispatch(getTiketAcaraAction({ acara_id: acaraId })).catch(() => {});
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
    //=================== CASE GET //===================
    builder.addCase(getTiketAcaraAction.pending, (state) => {
      state.isLoadingGet = true;
      state.isErrorGet = false;
    });
    builder.addCase(getTiketAcaraAction.fulfilled, (state, action) => {
      state.isLoadingGet = false;
      state.isErrorGet = false;
      state.tiketAcaraList = action.payload;
    });
    builder.addCase(getTiketAcaraAction.rejected, (state) => {
      state.isLoadingGet = false;
      state.isErrorGet = true;
    });

    //=================== CASE POST //===================
    builder.addCase(createTiketAcaraAction.pending, (state) => {
      state.isLoadingOn = true;
      state.isErrorOn = false;
    });
    builder.addCase(createTiketAcaraAction.fulfilled, (state) => {
      state.isLoadingOn = false;
      state.isErrorOn = false;
    });
    builder.addCase(createTiketAcaraAction.rejected, (state) => {
      state.isLoadingOn = false;
      state.isErrorOn = true;
    });

    //=================== CASE UPDATE //===================
    builder.addCase(updateTiketAcaraAction.pending, (state) => {
      state.isLoadingOn = true;
      state.isErrorOn = false;
    });
    builder.addCase(updateTiketAcaraAction.fulfilled, (state) => {
      state.isLoadingOn = false;
      state.isErrorOn = false;
    });
    builder.addCase(updateTiketAcaraAction.rejected, (state) => {
      state.isLoadingOn = false;
      state.isErrorOn = true;
    });

    //=================== CASE DELETE //===================
    builder.addCase(deleteTiketAcaraAction.pending, (state) => {
      state.isLoadingOn = true;
      state.isErrorOn = false;
    });
    builder.addCase(deleteTiketAcaraAction.fulfilled, (state) => {
      state.isLoadingOn = false;
      state.isErrorOn = false;
    });
    builder.addCase(deleteTiketAcaraAction.rejected, (state) => {
      state.isLoadingOn = false;
      state.isErrorOn = true;
    });
  },
});

export default acaraSlice.reducer;
