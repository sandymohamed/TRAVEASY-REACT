import { REGISTER_SUCCESS, REGISTER_FAIL, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from '../actions/type';

const userLocal = localStorage.getItem('user');

 let user = userLocal ? JSON.parse(userLocal) : null;

// pug!!
const initialState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null, isRegistered: false, user: null };

export default function AuthReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        isLoggedIn: false,
        isRegistered: true,
      };
    case REGISTER_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        isRegistered: false,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        user: payload.user,
        isRegistered: false,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
        isRegistered: false,
      };
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
        isRegistered: false,
      };
    default:
      return state;
  }
}
