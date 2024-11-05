import { combineReducers } from 'redux';
import { ingredientsSlice } from './ingredients/ingredients';
import { constructorSlice } from './burger-constructor/burgerConstructor';
import { orderSlice } from './order/order';
import { feedsSlice } from './feed/feed';
import { ordersSlice } from './orders/orders';
import { userSlice } from './user/user';

const rootReducer = combineReducers({
  ingredients: ingredientsSlice.reducer,
  burgerConstructor: constructorSlice.reducer,
  order: orderSlice.reducer,
  feeds: feedsSlice.reducer,
  ordersSlice: ordersSlice.reducer,
  userSlice: userSlice.reducer
});

export default rootReducer;
