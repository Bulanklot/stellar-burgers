import { RequestStatus } from '@utils-types';
import {
  getOrderByNumber,
  getOrders,
  ordersSlice,
  TOrdersSliceState
} from './orders';
import { error } from 'console';

describe('test ordersSlice reducer', () => {
  const initialState: TOrdersSliceState = {
    orders: [],
    orderByNumber: [],
    status: RequestStatus.Idle
  };

  const mockOrdersData = [
    {
      _id: '66e9f8b2119d45001b507802',
      ingredients: [
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa0946',
        '643d69a5c3f7b9001cfa0942',
        '643d69a5c3f7b9001cfa093c'
      ],
      status: 'done',
      name: 'Краторный spicy био-марсианский минеральный бургер',
      createdAt: '2024-09-17T21:46:26.339Z',
      updatedAt: '2024-09-17T21:46:26.815Z',
      number: 53260
    },
    {
      _id: '66e9fa78119d45001b507809',
      ingredients: [
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa093f',
        '643d69a5c3f7b9001cfa0948',
        '643d69a5c3f7b9001cfa0942',
        '643d69a5c3f7b9001cfa093c'
      ],
      status: 'done',
      name: 'Краторный бессмертный альфа-сахаридный spicy био-марсианский бургер',
      createdAt: '2024-09-17T21:54:00.389Z',
      updatedAt: '2024-09-17T21:54:00.890Z',
      number: 53261
    },
    {
      _id: '66e9fca4119d45001b50780b',
      ingredients: [
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa0942',
        '643d69a5c3f7b9001cfa093c'
      ],
      status: 'done',
      name: 'Краторный spicy био-марсианский бургер',
      createdAt: '2024-09-17T22:03:16.889Z',
      updatedAt: '2024-09-17T22:03:17.371Z',
      number: 53262
    },
    {
      _id: '66e9fcda119d45001b50780d',
      ingredients: [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa0940',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa0948',
        '643d69a5c3f7b9001cfa093d'
      ],
      status: 'done',
      name: 'Альфа-сахаридный флюоресцентный люминесцентный метеоритный бургер',
      createdAt: '2024-09-17T22:04:10.359Z',
      updatedAt: '2024-09-17T22:04:10.962Z',
      number: 53263
    },
    {
      _id: '66e9fd0e119d45001b50780e',
      ingredients: [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa0940',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa093f',
        '643d69a5c3f7b9001cfa0943',
        '643d69a5c3f7b9001cfa093d'
      ],
      status: 'done',
      name: 'Флюоресцентный space бессмертный люминесцентный метеоритный бургер',
      createdAt: '2024-09-17T22:05:02.246Z',
      updatedAt: '2024-09-17T22:05:02.717Z',
      number: 53264
    },
    {
      _id: '66ea002c119d45001b507814',
      ingredients: [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa0940',
        '643d69a5c3f7b9001cfa0946',
        '643d69a5c3f7b9001cfa093d'
      ],
      status: 'done',
      name: 'Флюоресцентный минеральный люминесцентный метеоритный бургер',
      createdAt: '2024-09-17T22:18:20.871Z',
      updatedAt: '2024-09-17T22:18:21.474Z',
      number: 53265
    }
  ];

  it('getOrders.pending ', () => {
    const expectedState: TOrdersSliceState = {
      ...initialState,
      status: RequestStatus.Loading
    };
    const actualState = ordersSlice.reducer(
      initialState,
      getOrders.pending('')
    );
    expect(actualState).toEqual(expectedState);
  });

  it('getOrders.fulfilled', () => {
    const expectedState: TOrdersSliceState = {
      orders: mockOrdersData,
      status: RequestStatus.Success,
      orderByNumber: []
    };
    const actualState = ordersSlice.reducer(
      initialState,
      getOrders.fulfilled(mockOrdersData, '')
    );
    expect(actualState).toEqual(expectedState);
  });

  it('getOrders.rejected', () => {
    const expectedState = { ...initialState, status: RequestStatus.Failed };
    const actualState = ordersSlice.reducer(
      initialState,
      getOrders.rejected(new Error(), '')
    );
    expect(actualState).toEqual(actualState);
  });

  it('getOrderByNumber.pending', () => {
    const expectedState: TOrdersSliceState = {
      ...initialState,
      status: RequestStatus.Loading
    };
    const actualState = ordersSlice.reducer(
      initialState,
      getOrderByNumber.pending('', 57403)
    );
    expect(actualState).toEqual(expectedState);
  });

  it('getOrderByNumber.fulfilled', () => {
    const expectedState: TOrdersSliceState = {
      ...initialState,
      orderByNumber: [
        {
          _id: '671a8f96d829be001c7787ea',
          ingredients: [
            '643d69a5c3f7b9001cfa093d',
            '643d69a5c3f7b9001cfa093e',
            '643d69a5c3f7b9001cfa0942',
            '643d69a5c3f7b9001cfa093d'
          ],
          status: 'done',
          name: 'Флюоресцентный spicy люминесцентный бургер',
          createdAt: '2024-10-24T18:19:02.774Z',
          updatedAt: '2024-10-24T18:19:03.715Z',
          number: 57403
        }
      ],
      status: RequestStatus.Success
    };
    const actualState = ordersSlice.reducer(
      initialState,
      getOrderByNumber.fulfilled(
        [
          {
            _id: '671a8f96d829be001c7787ea',
            ingredients: [
              '643d69a5c3f7b9001cfa093d',
              '643d69a5c3f7b9001cfa093e',
              '643d69a5c3f7b9001cfa0942',
              '643d69a5c3f7b9001cfa093d'
            ],
            status: 'done',
            name: 'Флюоресцентный spicy люминесцентный бургер',
            createdAt: '2024-10-24T18:19:02.774Z',
            updatedAt: '2024-10-24T18:19:03.715Z',
            number: 57403
          }
        ],
        '',
        57403
      )
    );
    expect(actualState).toEqual(expectedState);
  });

  it('getOrderByNumber.rejected', () => {
    const expectedState: TOrdersSliceState = {
      ...initialState,
      status: RequestStatus.Failed
    };
    const actualState = ordersSlice.reducer(
      initialState,
      getOrderByNumber.rejected(new Error(), '', 57403)
    );
    expect(actualState).toEqual(expectedState);
  });
});
