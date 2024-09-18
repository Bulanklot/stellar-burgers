import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  resetPasswordApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RequestStatus, TUser } from '@utils-types';
import { isActionPending, isActionRejected } from '../utils/action-util';
import { deleteCookie, setCookie } from '../utils/cookie';

export interface TUserState {
  isAuthChecked: boolean;
  data: TUser | null;
  status: RequestStatus;
}

export const initialState: TUserState = {
  isAuthChecked: false,
  data: null,
  status: RequestStatus.Idle
};

export const checkUserAuth = createAsyncThunk('getUser', async () => {
  const response = await getUserApi();
  return response;
});

export const registerUser = createAsyncThunk(
  'registerUser',
  async (userData: TRegisterData) => {
    const data = await registerUserApi(userData);
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data;
  }
);

export const loginUser = createAsyncThunk(
  'loginUser',
  async (userData: TLoginData) => {
    const data = await loginUserApi(userData);
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data;
  }
);

/*export const forgotPassword = createAsyncThunk(
  'forgotPassword',
  async (data: { email: string }) => {
    forgotPassword(data);
  }
);

export const resetPassword = createAsyncThunk(
  'resetPassword',
  async (data: { password: string; token: string }) => {
    resetPasswordApi(data);
  }
);
*/
export const updateUser = createAsyncThunk(
  'updateUser',
  async (user: Partial<TRegisterData>) => updateUserApi(user)
);

export const logOut = createAsyncThunk('logOut', async (_, { dispatch }) => {
  logoutApi().then(() => {
    localStorage.clear();
    deleteCookie('accessToken');
    dispatch(userLogout());
  });
});

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    authCheck: (state) => {
      state.isAuthChecked = true;
    },
    userLogout: (state) => {
      state.data = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkUserAuth.fulfilled, (state, action) => {
        state.data = action.payload.user;
        state.status = RequestStatus.Success;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.data = action.payload.user;
        state.status = RequestStatus.Success;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.data = action.payload.user;
        state.status = RequestStatus.Success;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.data = action.payload.user;
        state.status = RequestStatus.Success;
      })
      .addMatcher(isActionPending(userSlice.name), (state) => {
        state.status = RequestStatus.Loading;
      })
      .addMatcher(isActionRejected(userSlice.name), (state) => {
        state.status = RequestStatus.Failed;
      });
  },
  selectors: {
    getUser: (state) => state.data,
    getIsAuthChecked: (state) => state.isAuthChecked
  }
});

export const { getUser, getIsAuthChecked } = userSlice.selectors;
export const { authCheck, userLogout } = userSlice.actions;
