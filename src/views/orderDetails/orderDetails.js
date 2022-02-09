import React from 'react';
// import { CREATE_PRODUCT } from 'queries/product';

const DataList = React.lazy(() =>
  import(
    /* webpackChunkName: "product-data-list" */ '../app/pages/product/data-list'
  )
);
const OrderDetail = ({props}) => {
  return (
      <div>
          <DataList pathname='order-details' {...props} />;
      </div>
  );
};

export default OrderDetail;
