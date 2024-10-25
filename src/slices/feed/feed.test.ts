import { RequestStatus } from '@utils-types';
import { feedsSlice, feetchFeeds, initialState, TFeedState } from './feed';

describe('feedSlice test', () => {
  const mockResponseData = {
    success: true,
    orders: [
      {
        _id: '671a754bd829be001c778784',
        ingredients: [
          '643d69a5c3f7b9001cfa093c',
          '643d69a5c3f7b9001cfa093e',
          '643d69a5c3f7b9001cfa093c'
        ],
        status: 'done',
        name: 'Краторный люминесцентный бургер',
        createdAt: '2024-10-24T16:26:51.441Z',
        updatedAt: '2024-10-24T16:26:52.443Z',
        number: 57397
      },
      {
        _id: '671a7352d829be001c77877c',
        ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa093d'],
        status: 'done',
        name: 'Флюоресцентный бургер',
        createdAt: '2024-10-24T16:18:26.559Z',
        updatedAt: '2024-10-24T16:18:27.439Z',
        number: 57396
      },
      {
        _id: '671a6ff1d829be001c778761',
        ingredients: [
          '643d69a5c3f7b9001cfa093d',
          '643d69a5c3f7b9001cfa0942',
          '643d69a5c3f7b9001cfa093d'
        ],
        status: 'done',
        name: 'Флюоресцентный spicy бургер',
        createdAt: '2024-10-24T16:04:01.781Z',
        updatedAt: '2024-10-24T16:04:02.529Z',
        number: 57395
      }
    ],
    total: 57023,
    totalToday: 60
  };

  it('fetchFeeds.pending', () => {
    const expectedState: TFeedState = {
      ...initialState,
      status: RequestStatus.Loading
    };
    const actualState = feedsSlice.reducer(
      initialState,
      feetchFeeds.pending('')
    );
    expect(actualState).toEqual(expectedState);
  });

  it('fetchFeeds.rejected', () => {
    const expectedState: TFeedState = {
      ...initialState,
      status: RequestStatus.Failed
    };
    const actualState = feedsSlice.reducer(
      initialState,
      feetchFeeds.rejected(new Error(), '')
    );
  });

  it('fetchFeeds.fulfilled', () => {
    const expectedState: TFeedState = {
      orders: mockResponseData.orders,
      total: mockResponseData.total,
      totalToday: mockResponseData.totalToday,
      status: RequestStatus.Success
    };
    const actualState = feedsSlice.reducer(
      initialState,
      feetchFeeds.fulfilled(mockResponseData, '')
    );
    expect(actualState).toEqual(expectedState);
  });
});
