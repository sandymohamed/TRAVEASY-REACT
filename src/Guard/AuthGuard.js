import React, { useEffect, useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
//import { AuthContext } from '../context/AuthContext';
import { useSelector } from 'react-redux';

const AuthGuard = ({ children }) => {
  //const { isAuthorized } = useContext(AuthContext);

  const history = useHistory();
  const location = useLocation();
  let { isLoggedIn } = useSelector(({ AuthReducer }) => AuthReducer);

  useEffect(() => {
    if (location.pathname === '/hotel/:id' && isLoggedIn === false) {
      history.push('/login');
    }
    if (location.pathname === '/holidays/:id' && isLoggedIn === false) {
      history.push('/login');
    }

    if (location.pathname === '/user/profile' && isLoggedIn === false) {
      history.push('/login');
    }
  }, [location.pathname]);
  return children;
};

export default AuthGuard;
