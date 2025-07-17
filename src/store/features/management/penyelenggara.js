import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { serviceApi } from "../../services/services";
import { endpoints } from "../../services/endpoint";
import { httpMethod } from "../../services/method";

const TYPE = {
  GET_PENYELENGGARA: "get/penyelenggara",
  POST_PENYELENGGARA: "post/penyelenggara",
  PATCH_PENYELENGGARA: "patch/penyelenggara",
  DELETE_PENYELENGGARA: "delete/penyelenggara",
};

const initialState = {
  penyelenggaraList: [],
  isLoadingGet: false,
  isErrorGet: false,

  isLoadingOn: false,
  isErrorOn: false,
};

export const getPenyelenggaraAction = createAsyncThunk(
  TYPE.GET_PENYELENGGARA,
  async () => {
    return await new Promise((resolve, reject) => {
      serviceApi({
        withToken: true,
        endpoint: endpoints.penyelenggara,
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

export const createPenyelenggaraAction = createAsyncThunk(
  TYPE.POST_PENYELENGGARA,
  async ({ body }, { dispatch }) => {
    return await new Promise((resolve, reject) => {
      serviceApi({
        withToken: true,
        endpoint: endpoints.penyelenggara,
        method: httpMethod.post,
        body,
      })
        .then((res) => {
          dispatch(getPenyelenggaraAction()).catch(() => {});
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
);

export const updatePenyelenggaraAction = createAsyncThunk(
  TYPE.PATCH_PENYELENGGARA,
  async ({ body, penyeleggaraId }, { dispatch }) => {
    return await new Promise((resolve, reject) => {
      serviceApi({
        withToken: true,
        endpoint: endpoints.penyelenggara,
        method: httpMethod.patch,
        body,
        optionalHeaders: { id: penyeleggaraId },
      })
        .then((res) => {
          dispatch(getPenyelenggaraAction()).catch(() => {});
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
);

const penyelenggaraSlice = createSlice({
  name: "penyelenggara",
  initialState,
  reducers: {},
  extraReducers(builder) {
    //=================== CASE GET //===================
    builder.addCase(getPenyelenggaraAction.pending, (state) => {
      state.isLoadingGet = true;
      state.isErrorGet = false;
    });
    builder.addCase(getPenyelenggaraAction.fulfilled, (state, action) => {
      state.isLoadingGet = false;
      state.isErrorGet = false;
      state.penyelenggaraList = action.payload;
    });
    builder.addCase(getPenyelenggaraAction.rejected, (state) => {
      state.isLoadingGet = false;
      state.isErrorGet = true;
    });

    //=================== CASE POST //===================
    builder.addCase(createPenyelenggaraAction.pending, (state) => {
      state.isLoadingOn = true;
      state.isErrorOn = false;
    });
    builder.addCase(createPenyelenggaraAction.fulfilled, (state) => {
      state.isLoadingOn = false;
      state.isErrorOn = false;
    });
    builder.addCase(createPenyelenggaraAction.rejected, (state) => {
      state.isLoadingOn = false;
      state.isErrorOn = true;
    });

    //=================== CASE PATCH //===================
    builder.addCase(updatePenyelenggaraAction.pending, (state) => {
      state.isLoadingOn = true;
      state.isErrorOn = false;
    });
    builder.addCase(updatePenyelenggaraAction.fulfilled, (state) => {
      state.isLoadingOn = false;
      state.isErrorOn = false;
    });
    builder.addCase(updatePenyelenggaraAction.rejected, (state) => {
      state.isLoadingOn = false;
      state.isErrorOn = true;
    });
  },
});

export default penyelenggaraSlice.reducer;
