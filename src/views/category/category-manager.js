import React from 'react';
import { CREATE_CATEGORY } from 'queries/product';

const DataList = React.lazy(() =>
  import(
    /* webpackChunkName: "product-data-list" */ '../app/pages/product/data-list'
  )
);
const Category = ({ props }) => {
  return <DataList mutate={CREATE_CATEGORY} pathname='category' {...props} />;
};

export default Category;
