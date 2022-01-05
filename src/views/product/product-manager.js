import React from 'react';

const DataList = React.lazy(() =>
  import(
    /* webpackChunkName: "product-data-list" */ '../app/pages/product/data-list'
  )
);
const Product = ({ props }) => {
  return <DataList {...props} />;
};

export default Product;
