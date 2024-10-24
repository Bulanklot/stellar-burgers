import { RequestStatus } from '@utils-types';
import {
  fetchIngredients,
  ingredientsSlice,
  TIngredientsData
} from './ingredients';

describe('ingredientsSlice test', () => {
  const initialState: TIngredientsData = {
    ingredients: [],
    status: RequestStatus.Idle
  };

  const mockIngredients = [
    {
      _id: '643d69a5c3f7b9001cfa0941',
      name: 'Биокотлета из марсианской Магнолии',
      type: 'main',
      proteins: 420,
      fat: 142,
      carbohydrates: 242,
      calories: 4242,
      price: 424,
      image: 'https://code.s3.yandex.net/react/code/meat-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
    },
    {
      _id: '643d69a5c3f7b9001cfa093c',
      name: 'Краторная булка N-200i',
      type: 'bun',
      proteins: 80,
      fat: 24,
      carbohydrates: 53,
      calories: 420,
      price: 1255,
      image: 'https://code.s3.yandex.net/react/code/bun-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
    },
    {
      _id: '643d69a5c3f7b9001cfa0945',
      name: 'Соус с шипами Антарианского плоскоходца',
      type: 'sauce',
      proteins: 101,
      fat: 99,
      carbohydrates: 100,
      calories: 100,
      price: 88,
      image: 'https://code.s3.yandex.net/react/code/sauce-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/sauce-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/sauce-01-large.png'
    }
  ];

  it('fechIngredients.pending', () => {
    const expectedState = { ...initialState, status: RequestStatus.Loading };
    const actualState = ingredientsSlice.reducer(
      initialState,
      fetchIngredients.pending('')
    );
    expect(actualState).toEqual(expectedState);
  });

  it('fetchIngredients.fulfilled', () => {
    const expectedState: TIngredientsData = {
      ingredients: mockIngredients,
      status: RequestStatus.Success
    };
    const actualState = ingredientsSlice.reducer(
      initialState,
      fetchIngredients.fulfilled(mockIngredients, '')
    );
    expect(actualState).toEqual(expectedState);
  });

  it('fetchIngredients.rejected', () => {
    const expectedState = { ...initialState, status: RequestStatus.Failed };
    const actualState = ingredientsSlice.reducer(
      initialState,
      fetchIngredients.rejected(new Error(), '')
    );
  });
});
