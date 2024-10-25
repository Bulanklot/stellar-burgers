import { RequestStatus, TOrder } from '@utils-types';
import {
  initialState,
  makeNewOrder,
  orderSlice,
  resetOrder,
  TOrderState
} from './order';

describe('orderSlice test', () => {
  const mockOrderData: TOrder = {
    _id: '671a8f96d829be001c7787ea',
    ingredients: [
      'Флюоресцентная булка R2-D3',
      'Флюоресцентный spicy люминесцентный бургер',
      'Филе Люминесцентного тетраодонтимформа',
      'Соус Spicy-X',
      'Флюоресцентная булка R2-D3'
    ],
    status: 'done',
    name: 'Флюоресцентный spicy люминесцентный бургер',
    createdAt: '2024-10-24T18:19:02.774Z',
    updatedAt: '2024-10-24T18:19:03.715Z',
    number: 57403
  };

  it('resetOrder reducer test ', () => {
    const state = {
      info: mockOrderData,
      status: RequestStatus.Success
    };
    const actualState = orderSlice.reducer(state, resetOrder());
    expect(actualState).toEqual(initialState);
  });

  it('makeNewOrder.pending', () => {
    const expectedState = {
      ...initialState,
      status: RequestStatus.Loading
    };
    const actualState = orderSlice.reducer(
      initialState,
      makeNewOrder.pending('', [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa0942',
        '643d69a5c3f7b9001cfa093d'
      ])
    );
    expect(actualState).toEqual(expectedState);
  });

  it('makeNewOrder.fulfilled', () => {
    const expectedState: TOrderState = {
      info: mockOrderData,
      status: RequestStatus.Success
    };
    const actualState = orderSlice.reducer(
      initialState,
      makeNewOrder.fulfilled(mockOrderData, '', [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa0942',
        '643d69a5c3f7b9001cfa093d'
      ])
    );
    expect(actualState).toEqual(expectedState);
  });

  it('makeNewOrder.rejected', () => {
    const expectedState: TOrderState = {
      ...initialState,
      status: RequestStatus.Failed
    };
    const actualState = orderSlice.reducer(
      initialState,
      makeNewOrder.rejected(new Error(), '', [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa0942',
        '643d69a5c3f7b9001cfa093d'
      ])
    );
    expect(actualState).toEqual(expectedState);
  });
});
