import { getIngredientsApi } from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient, RequestStatus } from '@utils-types';
import { INGREDIENTS_SLICE_NAME } from 'src/utils/constants';

export interface TIngredientsData {
  ingredients: TIngredient[];
  status: RequestStatus;
}

const initialState: TIngredientsData = {
  ingredients: [],
  status: RequestStatus.Idle
};

export const fetchIngredients = createAsyncThunk('getIngredients', async () =>
  getIngredientsApi()
);

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    selectIngredients: (state) => state.ingredients,
    selectStatus: (state) => state.status
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.ingredients = action.payload;
        state.status = RequestStatus.Success;
      })
      .addCase(fetchIngredients.rejected, (state) => {
        state.status = RequestStatus.Failed;
      });
  }
});

export const { selectIngredients, selectStatus } = ingredientsSlice.selectors;
