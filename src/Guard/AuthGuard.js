import  { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AuthGuard = ({ children }) => {
  //const { isAuthorized } = useContext(AuthContext);

  let history = useHistory();
  let location = useLocation();
  let { isLoggedIn } = useSelector(({ AuthReducer }) => AuthReducer);
  useEffect(() => {
    if (location.pathname === '/hotel/:id' && (isLoggedIn === false)) {
      history.push('/forbiden');
    }
    if (location.pathname === '/holidays/:id' && (isLoggedIn === false)) {
      history.push('/forbiden');
    }

    if (location.pathname === '/user/profile' && (isLoggedIn === false)) {
      history.push('/forbiden');
    }
  }, [location.pathname]);
  return children;
};

export default AuthGuard;
