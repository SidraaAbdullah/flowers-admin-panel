import React from 'react';
// import { CREATE_PRODUCT } from 'queries/product';

const DataList = React.lazy(() =>
  import(
    /* webpackChunkName: "product-data-list" */ '../app/pages/rider/data-list'
  )
);
const RiderDetails = ({ props }) => {
  return (
    <div>
      <DataList {...props} />;
    </div>
  );
};

export default RiderDetails;
