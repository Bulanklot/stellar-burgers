import { orderBurgerApi } from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RequestStatus, TOrder } from '@utils-types';

interface TOrderState {
  info: TOrder | null;
  status: RequestStatus;
}

const initialState: TOrderState = {
  info: null,
  status: RequestStatus.Idle
};

export const makeNewOrder = createAsyncThunk(
  'makeOrder',
  (orderData: string[]) => {
    const response = orderBurgerApi(orderData).then(({ order }) => order);
    return response;
  }
);

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    resetOrder: (state) => {
      state.info = null;
      state.status = RequestStatus.Idle;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(makeNewOrder.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(
        makeNewOrder.fulfilled,
        (state, { payload }: PayloadAction<TOrder>) => {
          state.status = RequestStatus.Success;
          state.info = payload;
          console.log(state.info);
        }
      );
  },
  selectors: {
    orderState: (state) => state
  }
});

export const { resetOrder } = orderSlice.actions;
export const { orderState } = orderSlice.selectors;
