import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const DataList = React.lazy(() =>
  import(/* webpackChunkName: "product-data-list" */ './data-list')
);

const PagesProduct = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/data-list`} />
      <Route
        path={`${match.url}/data-list`}
        render={(props) => <DataList {...props} />}
      />
    </Switch>
  </Suspense>
);
export default PagesProduct;
