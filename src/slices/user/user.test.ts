import { RequestStatus, TUser } from '@utils-types';
import {
  authCheck,
  checkUserAuth,
  getUser,
  initialState,
  loginUser,
  registerUser,
  TUserState,
  updateUser,
  userLogout,
  userSlice
} from './user';
import { TLoginData } from '@api';
import { act } from 'react-dom/test-utils';

describe('userSlice', () => {
  const userRegistrationData = {
    email: 'test@mail.com',
    name: 'name',
    password: 'password'
  };

  const userLoginDatata: TLoginData = {
    email: 'test@mail.com',
    password: 'password'
  };

  const userTestData: TUser = { email: 'test@test.ru', name: 'Bulat' };

  describe('test reducers', () => {
    it('authtorization works correctly', () => {
      const expectedState = {
        ...initialState,
        isAuthChecked: true
      };
      const actualState = userSlice.reducer(initialState, authCheck());

      expect(actualState).toEqual(expectedState);
    });

    it('logout works correctly', () => {
      const actualState = userSlice.reducer(
        { ...initialState, data: userTestData },
        userLogout()
      );

      expect(actualState).toEqual(initialState);
    });
  });

  describe('test extra reducers ', () => {
    it('checkUserAuth.pending ', () => {
      const expectedState: TUserState = {
        isAuthChecked: false,
        data: null,
        status: RequestStatus.Loading
      };
      const actualState = userSlice.reducer(
        initialState,
        checkUserAuth.pending('checkUserAuth')
      );
      expect(actualState).toEqual(expectedState);
    });

    it(' checkUserAuth.rejected', () => {
      const expectedState = { ...initialState, status: RequestStatus.Failed };
      const actualState = userSlice.reducer(
        initialState,
        checkUserAuth.rejected(new Error(), '')
      );
      expect(actualState).toEqual(expectedState);
    });

    it('checkUserAuth.fulfilled', () => {
      const expectedState = {
        ...initialState,
        data: userTestData,
        status: RequestStatus.Success
      };
      const actualState = userSlice.reducer(
        initialState,
        checkUserAuth.fulfilled({ user: userTestData, success: true }, '')
      );
      expect(actualState).toEqual(expectedState);
    });

    it('registerUser.pending', () => {
      const expectedState = {
        ...initialState,
        status: RequestStatus.Loading
      };
      const actualState = userSlice.reducer(
        initialState,
        registerUser.pending('', userRegistrationData)
      );
      expect(actualState).toEqual(expectedState);
    });

    it('registerUser.fulfilled', () => {
      const expectedState = {
        ...initialState,
        data: userTestData,
        status: RequestStatus.Success
      };
      const mockAuthResponceData = {
        success: true,
        refreshToken: 'test-refreshToken',
        accessToken: 'test-accessToken',
        user: userTestData
      };
      const actualState = userSlice.reducer(
        initialState,
        registerUser.fulfilled(mockAuthResponceData, '', userRegistrationData)
      );
      expect(actualState).toEqual(expectedState);
    });

    it('registerUser.rejected', () => {
      const expectedState = {
        ...initialState,
        status: RequestStatus.Failed
      };
      const actualState = userSlice.reducer(
        initialState,
        registerUser.rejected(new Error(), '', userRegistrationData)
      );
      expect(actualState).toEqual(expectedState);
    });

    it('loginUser.pending', () => {
      const expectedState = {
        ...initialState,
        status: RequestStatus.Loading
      };
      const actualState = userSlice.reducer(
        initialState,
        loginUser.pending('', userLoginDatata)
      );
      expect(actualState).toEqual(expectedState);
    });

    it('loginUser.fulfilled', () => {
      const expectedState: TUserState = {
        ...initialState,
        data: userTestData,
        status: RequestStatus.Success
      };
      const mockAuthResponceData = {
        success: true,
        refreshToken: 'test-refreshToken',
        accessToken: 'test-accessToken',
        user: userTestData
      };
      const actualState = userSlice.reducer(
        initialState,
        loginUser.fulfilled(mockAuthResponceData, '', userLoginDatata)
      );
      expect(actualState).toEqual(expectedState);
    });

    it('loginUser.rejected', () => {
      const expectedState = {
        ...initialState,
        status: RequestStatus.Failed
      };
      const actualState = userSlice.reducer(
        initialState,
        loginUser.rejected(new Error(), '', userLoginDatata)
      );
      expect(actualState).toEqual(expectedState);
    });

    it('updateUser.pending', () => {
      const expectedState = {
        ...initialState,
        status: RequestStatus.Loading
      };
      const actualState = userSlice.reducer(
        initialState,
        updateUser.pending('', userRegistrationData)
      );
      expect(actualState).toEqual(expectedState);
    });

    it('updateUser.rejected', () => {
      const expectedState = { ...initialState, status: RequestStatus.Failed };
      const actualState = userSlice.reducer(
        initialState,
        updateUser.rejected(new Error(), '', userRegistrationData)
      );
      expect(actualState).toEqual(expectedState);
    });

    it('updateUser.fulfilled', () => {
      const expectedState = {
        ...initialState,
        data: userTestData,
        status: RequestStatus.Success
      };
      const actualState = userSlice.reducer(
        initialState,
        updateUser.fulfilled(
          { success: true, user: userTestData },
          '',
          userRegistrationData
        )
      );
      expect(actualState).toEqual(expectedState);
    });
  });
});
