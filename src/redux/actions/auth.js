import { REGISTER_SUCCESS, REGISTER_FAIL, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, SET_MESSAGE } from './type';
import AuthService from '../../services/authAPI';

export const register = (userData) => (dispatch) => {
  try {
    AuthService.register(userData).then((response) => {
      let message = response ? response.message : null;

      if (message) {
        dispatch({ type: REGISTER_SUCCESS });
        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });
      }
      return Promise.resolve();
    });
  } catch (error) {
    const message = JSON.stringify(error);
    console.warn('message =>', error);

    dispatch({
      type: REGISTER_FAIL,
    });

    dispatch({
      type: SET_MESSAGE,
      payload: message,
    });

    return Promise.reject();
  }
};

export const login = (credentials) => (dispatch) => {
  return AuthService.login(credentials).then(
    (data) => {
      if (data) {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: {
            user: data,
          },
        });
      } else {
        dispatch({
          type: LOGIN_FAIL,
        });
      }

      return Promise.resolve();
    },
    (error) => {
      const message = error.toString();

      dispatch({
        type: LOGIN_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const logout = () => (dispatch) => {
  AuthService.logout();

  dispatch({
    type: LOGOUT,
  });
};
