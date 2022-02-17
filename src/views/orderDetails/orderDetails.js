import React from 'react';

const DataList = React.lazy(() => import('../app/pages/order/data-list'));

const OrderDetail = ({ props }) => {
  return (
    <div>
      <DataList {...props} />;
    </div>
  );
};
export default OrderDetail;
