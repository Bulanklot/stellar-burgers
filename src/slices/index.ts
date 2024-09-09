import { combineReducers } from 'redux';
import { ingredientsSlice } from './ingredients';
import { constructorSlice } from './burgerConstructor';
import { orderSlice } from './order';

const rootReducer = combineReducers({
  ingredients: ingredientsSlice.reducer,
  burgerConstructor: constructorSlice.reducer,
  order: orderSlice.reducer
});

export default rootReducer;
