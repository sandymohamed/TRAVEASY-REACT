import './Login.scss';
import loginImg from '../../../assets/login.jpg';
import { useState, useContext } from 'react';

import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Redirect } from 'react-router-dom';
import { login } from '../../../redux/actions/auth';
import { ToastContainer, toast } from 'react-toastify';
import { DarkModeContext } from '../../../context/DarkMode';

function SignIn() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [userData, setUserData] = useState({
    username: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    usernameErr: null,
    passwordErr: null,
  });
  let { isLoggedIn, user } = useSelector(({ AuthReducer }) => AuthReducer);
  let { message } = useSelector((MessageReducer) => MessageReducer);
  const { darkMode } = useContext(DarkModeContext);

  const regex = new RegExp('^[a-zA-Z0-9!@#$%]+$');
  const changeDetails = (e) => {
    if (e.target.name === 'username') {
      setUserData({
        ...userData,
        username: e.target.value,
      });

      setErrors({
        ...errors,
        usernameErr: regex.test(e.target.value) ? null : 'invalid username',
      });
    } else if (e.target.name === 'password') {
      setUserData({
        ...userData,
        password: e.target.value,
      });

      setErrors({
        ...errors,
        passwordErr: e.target.value.length < 6 ? '*password must containes 8 characters at least' : null,
      });
    }
  };

  const submitData = (e) => {
    e.preventDefault();
    console.log(isLoggedIn);

    if (!errors.usernameErr && !errors.passwordErr) {
      // pug!
      try {
        dispatch(login(userData));
      } catch (error) {
        return toast.info(`Something Wrong! try again`, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    } else {
      toast.info(`Something Wrong!`, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
    setTimeout(() => {
      window.location.reload();
    }, 3000);
    if (isLoggedIn) {
      history.push('/home');
    }
  };

  return (
    <>
    <div className='log-container'>
      <section
        id="login"
        className={`login${darkMode}`}>
        <div className={`container `}>
          <div className="loginImg ">
            <img
              src={loginImg}
              alt="login img"
              className=""
            />
          </div>
          <ToastContainer />

          <form onSubmit={(e) => submitData(e)}>
            <div className="loginGorm_title">
              <span> Welcome To TravEasy</span>
              <h3> Sign In</h3>
            </div>
            <div>
              <label
                htmlFor="username"
                className="form-label">
                Username
              </label>
              <input
                type="text"
                className={`form-control ${errors.usernameErr && 'border-danger'}`}
                name="username"
                value={userData.username}
                onChange={(e) => changeDetails(e)}
              />

              <p className="text-danger"> {errors.usernameErr} </p>
            </div>

            <div>
              <label
                htmlFor="password"
                className="form-label">
                Password
              </label>
              <input
                type="password"
                className={`form-control ${errors.passwordErr && 'border-danger'} `}
                name="password"
                value={userData.password}
                onChange={(e) => changeDetails(e)}
              />

              <p className="text-danger"> {errors.passwordErr} </p>
              <div className="d-flex flex-column align-items-center">
                <button
                  disabled={errors.usernameErr || errors.passwordErr}
                  type="submit"
                  className="primaryBtn">
                  Login
                </button>
                <Link to="/register">Create an account</Link>
              </div>
            </div>
          </form>
        </div>
      </section>
      </div>
    </>
  );
}

export default SignIn;
