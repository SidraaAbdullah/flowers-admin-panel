import React, { Suspense } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import AppLayout from 'layout/AppLayout';
import Product from 'views/product';
import { getLocalStorageValues } from '../../constants';
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

const App = () => {
  // eslint-disable-next-line prefer-const
  let { User } = getLocalStorageValues();
  if (!User.email) {
    return <Redirect from="*" to="/user/login" />;
  }
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
              render={(props) => <Product props={props} />}
            />
            <Route
              path="/categories"
              render={(props) => <Product props={props} />}
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
