import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { allOrders, getOrders } from '../../slices/orders';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */

  const dispatch = useDispatch();
  const handleGetOrders = useCallback(() => {
    dispatch(getOrders());
  }, [dispatch]);
  useEffect(() => {
    handleGetOrders();
  }, [handleGetOrders]);
  const orders: TOrder[] = useSelector(allOrders);

  return <ProfileOrdersUI orders={orders} />;
};
