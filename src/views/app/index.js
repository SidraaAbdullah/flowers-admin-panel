import React, { Suspense } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import AppLayout from 'layout/AppLayout';
// import { ProtectedRoute, UserRole } from 'helpers/authHelper';

const Dashboards = React.lazy(() =>
  import(/* webpackChunkName: "dashboards" */ './dashboards')
);
const Pages = React.lazy(() =>
  import(/* webpackChunkName: "pages" */ './pages')
);
const Applications = React.lazy(() =>
  import(/* webpackChunkName: "applications" */ './applications')
);
const Ui = React.lazy(() => import(/* webpackChunkName: "ui" */ './ui'));
const Menu = React.lazy(() => import(/* webpackChunkName: "menu" */ './menu'));
const BlankPage = React.lazy(() =>
  import(/* webpackChunkName: "blank-page" */ './blank-page')
);
const DataList = React.lazy(() =>
  import(
    /* webpackChunkName: "product-data-list" */ './pages/product/data-list'
  )
);
const App = () => {
  return (
    <AppLayout>
      <div className="dashboard-wrapper">
        <Suspense fallback={<div className="loading" />}>
          <Switch>
            <Redirect exact from="/" to="/dashboards" />
            <Route
              path="/dashboards"
              render={(props) => <Dashboards {...props} />}
            />
            <Route
              path="/applications"
              render={(props) => <Applications {...props} />}
            />
            {/* <ProtectedRoute
                    path={`/applications`}
                    component={Applications}
                    roles={[UserRole.Admin]}
            /> */}
            <Route
              path="/products"
              render={(props) => <DataList {...props} />}
            />
            <Route path="/pages" render={(props) => <Pages {...props} />} />
            <Route path="/ui" render={(props) => <Ui {...props} />} />
            <Route path="/menu" render={(props) => <Menu {...props} />} />
            <Route
              path="/blank-page"
              render={(props) => <BlankPage {...props} />}
            />
            <Redirect to="/error" />
          </Switch>
        </Suspense>
      </div>
    </AppLayout>
  );
};

const mapStateToProps = ({ menu }) => {
  const { containerClassnames } = menu;
  return { containerClassnames };
};

export default withRouter(connect(mapStateToProps, {})(App));
