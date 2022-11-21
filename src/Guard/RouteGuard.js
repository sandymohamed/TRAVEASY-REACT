import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const GuardedRoute = ({ component: Component, auth, ...rest }) => {
  let { isLoggedIn } = useSelector(({ AuthReducer }) => AuthReducer);

  return (
    <Route
      {...rest}
      render={(props) => (isLoggedIn === true ? <Component {...props} /> : <Redirect to="/forbiden" />)}
    />
  );
};

export default GuardedRoute;
