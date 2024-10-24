import { constructorSlice } from './burger-constructor/burgerConstructor';
import { feedsSlice } from './feed/feed';
import { ingredientsSlice } from './ingredients/ingredients';
import { orderSlice } from './order/order';
import { ordersSlice } from './orders/orders';
import rootReducer from './rootReducer';
import { userSlice } from './user/user';

describe('rootReducer', () => {
  it('initializes the state correctly', () => {
    const initAction = { type: '@@INIT' };
    const state = rootReducer(undefined, initAction);
    expect(state).toEqual({
      ingredients: ingredientsSlice.reducer(undefined, initAction),
      burgerConstructor: constructorSlice.reducer(undefined, initAction),
      order: orderSlice.reducer(undefined, initAction),
      feeds: feedsSlice.reducer(undefined, initAction),
      ordersSlice: ordersSlice.reducer(undefined, initAction),
      userSlice: userSlice.reducer(undefined, initAction)
    });
  });
});
