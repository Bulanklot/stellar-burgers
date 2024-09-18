import { combineReducers } from 'redux';
import { ingredientsSlice } from './ingredients';
import { constructorSlice } from './burgerConstructor';
import { orderSlice } from './order';
import { feedsSlice } from './feed';
import { ordersSlice } from './orders';
import { userSlice } from './user';

const rootReducer = combineReducers({
  ingredients: ingredientsSlice.reducer,
  burgerConstructor: constructorSlice.reducer,
  order: orderSlice.reducer,
  feeds: feedsSlice.reducer,
  ordersSlice: ordersSlice.reducer,
  userSlice: userSlice.reducer
});

export default rootReducer;
