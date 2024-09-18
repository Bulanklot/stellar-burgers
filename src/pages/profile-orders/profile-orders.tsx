import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { allOrders, getOrders } from '../../slices/orders';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrders);
  }, [dispatch]);
  const orders: TOrder[] = useSelector(allOrders);

  return <ProfileOrdersUI orders={orders} />;
};
