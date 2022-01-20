import React from 'react';
import { CREATE_PRODUCT } from 'queries/product';

const DataList = React.lazy(() =>
  import(
    /* webpackChunkName: "product-data-list" */ '../app/pages/product/data-list'
  )
);
const Product = ({ props }) => {
  return <DataList mutate={CREATE_PRODUCT} pathname='product' {...props} />;
};

export default Product;
