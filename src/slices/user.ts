/* import { createSlice } from '@reduxjs/toolkit';
import { RequestStatus } from '@utils-types';
import { USER_SLICE_NAME } from 'src/utils/constants';

 export interface TUserState {
    isAuthChecked: boolean;
    data : UserDto | null;
    requestStatus: RequestStatus;
}


const initialState: TUserState = {
    isAuthChecked: false,
    data: null,
    requestStatus: RequestStatus.Idle,
};

export const userSlice = createSlice({
    name: USER_SLICE_NAME,
    initialState,
    reducers: {
        authCheck : state =>{

        },
    },
    extraReducers: builder =>{
        builder
        .addCase(checkUserAuth.fullfilled,(state,action) => {
            state.data = action.payload.user;
            state.requestStatus = RequestStatus.Success;
        })


    },
    selectors : {
        getUser: (state: TUserState) => state.data,
        getAuthChecked: (state: TUserState) => state.isAuthChecked,
    }
})*/
