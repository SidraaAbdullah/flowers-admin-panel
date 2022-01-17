import React, { useState } from 'react';
import {
  Row,
  Card,
  CardTitle,
  Label,
  FormGroup,
  Button,
  Input,
} from 'reactstrap';
import { NavLink, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { LOGIN } from 'queries';
import { adminRoot } from 'constants/defaultValues';
import { Colxx } from 'components/common/CustomBootstrap';
import IntlMessages from 'helpers/IntlMessages';
import { loginUser } from 'redux/actions';
import { useMutation } from 'react-query';
import axios from 'axios';
import { getLocalStorageValues } from '../../constants';

const Login = ({ history }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  // eslint-disable-next-line prefer-const
  let { User } = getLocalStorageValues();
  const { mutate: login, isLoading: loginLoading } = useMutation(LOGIN);
  const handleLogin = async () => {
    await login(
      { email, password },
      {
        onSuccess: (res) => {
          history.push(adminRoot);
          axios.defaults.headers.common.Authorization = `bearer ${res.data?.access_token}`;
          localStorage.setItem('User', JSON.stringify(res.data));
        },
        onError: () => {
          alert('Username or password is wrong!');
        },
      }
    );
  };

  if (User.email) {
    return <Redirect from="*" to="/dashboards/default" />;
  }
  return (
    <Row className="h-100">
      <Colxx xxs="12" md="10" className="mx-auto my-auto">
        <Card className="auth-card">
          <div className="position-relative image-side ">
            <p className="text-white h2">MAGIC IS IN THE DETAILS</p>
            <p className="white mb-0">
              Please use your credentials to login.
              <br />
              If you are not a member, please{' '}
              <NavLink to="/user/register" className="black red">
                register.
              </NavLink>
            </p>
          </div>
          <div className="form-side">
            <NavLink to="/" className="white">
              <span className="logo-single" />
            </NavLink>
            <CardTitle className="mb-4">
              <IntlMessages id="user.login-title" />
            </CardTitle>

            <FormGroup className="form-group has-float-label">
              <Label>
                <IntlMessages id="user.email" />
              </Label>
              <Input
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormGroup>
            <FormGroup className="form-group has-float-label">
              <Label>
                <IntlMessages id="user.password" />
              </Label>
              <Input
                className="form-control"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormGroup>
            <div className="d-flex justify-content-between align-items-center">
              <NavLink to="/user/forgot-password">
                <IntlMessages id="user.forgot-password-question" />
              </NavLink>
              <Button
                onClick={handleLogin}
                color="primary"
                className={`btn-shadow btn-multiple-state ${
                  loginLoading ? 'show-spinner' : ''
                }`}
                size="lg"
              >
                <span className="spinner d-inline-block">
                  <span className="bounce1" />
                  <span className="bounce2" />
                  <span className="bounce3" />
                </span>
                <span className="label">
                  <IntlMessages id="user.login-button" />
                </span>
              </Button>
            </div>
          </div>
        </Card>
      </Colxx>
    </Row>
  );
};

const mapStateToProps = ({ authUser }) => {
  const { loading, error } = authUser;
  return { loading, error };
};

export default connect(mapStateToProps, {
  loginUserAction: loginUser,
})(Login);
