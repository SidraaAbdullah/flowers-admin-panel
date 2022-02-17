import React from 'react';
import { useQuery } from 'react-query';
import { ORDER } from 'queries';

const DataList = React.lazy(() => import('../app/pages/order/data-list'));

const OrderDetail = ({ props }) => {
  const { data: order, refetch } = useQuery('ORDER', ORDER);
  console.log(order);
  return (
    <div>
      <DataList refetch={refetch} pathname="order" {...props} />;
    </div>
  );
};
export default OrderDetail;
