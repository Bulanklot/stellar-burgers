import { FC, useEffect } from 'react';

import { TOrder } from '@utils-types';
import { FeedInfoUI } from '../ui/feed-info';
import { useDispatch, useSelector } from '../../services/store';
import { feedsState, feetchFeeds, getFeedsOrders } from '../../slices/feed';

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  /** TODO: взять переменные из стора */

  const orders: TOrder[] = useSelector(getFeedsOrders);
  const feed = useSelector(feedsState);

  const readyOrders = getOrders(orders, 'done');

  const pendingOrders = getOrders(orders, 'pending');

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={feed}
    />
  );
};
