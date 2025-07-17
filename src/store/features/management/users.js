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

  isLoadingOn: false,
  isErrorOn: false,
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

export const createUsersAction = createAsyncThunk(
  TYPE.POST_USERS,
  async ({ body }, { dispatch }) => {
    return await new Promise((resolve, reject) => {
      serviceApi({
        withToken: true,
        endpoint: endpoints.user,
        method: httpMethod.post,
        body,
      })
        .then((res) => {
          dispatch(getUsersAction()).catch(() => {});
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
);

export const updateUsersAction = createAsyncThunk(
  TYPE.PATCH_USERS,
  async ({ body, userId }, { dispatch }) => {
    return await new Promise((resolve, reject) => {
      serviceApi({
        withToken: true,
        endpoint: endpoints.user,
        method: httpMethod.patch,
        body,
        optionalHeaders: { id: userId },
      })
        .then((res) => {
          dispatch(getUsersAction()).catch(() => {});
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
);

const acaraSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers(builder) {
    //=================== CASE GET //===================
    builder.addCase(getUsersAction.pending, (state) => {
      state.isLoadingGet = true;
      state.isErrorGet = false;
    });
    builder.addCase(getUsersAction.fulfilled, (state, action) => {
      state.isLoadingGet = false;
      state.isErrorGet = false;
      state.usersList = action.payload;
    });
    builder.addCase(getUsersAction.rejected, (state) => {
      state.isLoadingGet = false;
      state.isErrorGet = true;
    });

    //=================== CASE POST //===================
    builder.addCase(createUsersAction.pending, (state) => {
      state.isLoadingOn = true;
      state.isErrorOn = false;
    });
    builder.addCase(createUsersAction.fulfilled, (state) => {
      state.isLoadingOn = false;
      state.isErrorOn = false;
    });
    builder.addCase(createUsersAction.rejected, (state) => {
      state.isLoadingOn = false;
      state.isErrorOn = true;
    });

    //=================== CASE PATCH //===================
    builder.addCase(updateUsersAction.pending, (state) => {
      state.isLoadingOn = true;
      state.isErrorOn = false;
    });
    builder.addCase(updateUsersAction.fulfilled, (state) => {
      state.isLoadingOn = false;
      state.isErrorOn = false;
    });
    builder.addCase(updateUsersAction.rejected, (state) => {
      state.isLoadingOn = false;
      state.isErrorOn = true;
    });
  },
});

export default acaraSlice.reducer;
