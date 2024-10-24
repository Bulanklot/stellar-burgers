import { getOrderByNumberApi, getOrdersApi } from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RequestStatus, TOrder } from '@utils-types';

export interface TOrdersSliceState {
  orders: TOrder[];
  orderByNumber: TOrder[];
  status: RequestStatus;
}

const initialState: TOrdersSliceState = {
  orders: [],
  orderByNumber: [],
  status: RequestStatus.Idle
};

export const getOrders = createAsyncThunk('getOrders', async () =>
  getOrdersApi()
);

export const getOrderByNumber = createAsyncThunk(
  'getOrderByNumber',
  async (number: number) => {
    const response = getOrderByNumberApi(number).then(({ orders }) => orders);
    return response;
  }
);

export const ordersSlice = createSlice({
  name: 'ordersSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.status = RequestStatus.Success;
      })
      .addCase(getOrders.rejected, (state) => {
        state.status = RequestStatus.Failed;
      })
      .addCase(getOrderByNumber.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.orderByNumber = action.payload;
        state.status = RequestStatus.Success;
      })
      .addCase(getOrderByNumber.rejected, (state) => {
        state.status = RequestStatus.Failed;
      });
  },
  selectors: {
    allOrders: (state) => state.orders,
    orderByNumber: (state) => state.orderByNumber
  }
});

export const { allOrders, orderByNumber } = ordersSlice.selectors;
