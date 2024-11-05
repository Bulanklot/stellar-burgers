import { FC, useMemo } from 'react';
import { RequestStatus, TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import {
  constructorState,
  resetConstructor
} from '../../slices/burger-constructor/burgerConstructor';
import { makeNewOrder, orderState, resetOrder } from '../../slices/order/order';
import { getUser } from '../../slices/user/user';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const items = useSelector(constructorState);
  const { info, status } = useSelector(orderState);
  const dispatch = useDispatch();
  const constructorItems = items;

  const orderRequest = status === RequestStatus.Loading;

  const orderModalData = info;

  const user = useSelector(getUser);
  const navigate = useNavigate();

  const onOrderClick = () => {
    if (!user) {
      navigate('/login');
    }
    if (!constructorItems.bun || orderRequest) return;
    dispatch(
      makeNewOrder([
        constructorItems.bun._id,
        ...constructorItems.ingredients.map(
          (ing: TConstructorIngredient) => ing._id
        ),
        constructorItems.bun._id
      ])
    );
  };

  const closeOrderModal = () => {
    dispatch(resetOrder());
    dispatch(resetConstructor());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
