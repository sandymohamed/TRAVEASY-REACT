import './Login.scss';
import loginImg from '../../../assets/login.jpg';
import { useState, useContext, useEffect } from 'react';

import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Redirect } from 'react-router-dom';
import { login } from '../../../redux/actions/auth';
import { ToastContainer, toast } from 'react-toastify';
import { DarkModeContext } from '../../../context/DarkMode';
import { Button, Form } from 'react-bootstrap';

function SignIn() {
  const dispatch = useDispatch();
  const history = useHistory();
  let { isLoggedIn, user } = useSelector(({ AuthReducer }) => AuthReducer);

  useEffect(() => {
    if (isLoggedIn === true) {
      history.push('/home');
    }
  }, [])

  const [userData, setUserData] = useState({
    username: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    usernameErr: null,
    passwordErr: null,
  });
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
    }, 2000);

  };

  return (
    <>
      <div className='log-container'>
        <section
          id="login"
          className={`login${darkMode}`}>
          <div className='container p-0 m-0'>
            <div className="loginImg ">
              <img
                src={loginImg}
                alt="login img"
                className="p-0 m-0 margin-end-2"
              />
            </div>
            <ToastContainer />

            <Form onSubmit={(e) => submitData(e)} >
              <div className="loginGorm_title">
                <span> Welcome To TravEasy</span>
                <h3> Sign In</h3>
              </div>

              <Form.Group className="mb-3" controlId="username">
                <Form.Label
                  htmlFor="username"
                  className="form-label">
                  Username
                </Form.Label>
                <Form.Control
                  type="text"
                  className={`form-control ${errors.usernameErr && 'border-danger'}`}
                  name="username"
                  value={userData.username}
                  onChange={(e) => changeDetails(e)}
                />

                <p className="text-danger"> {errors.usernameErr} </p>
              </Form.Group>

              <Form.Group className="mb-3" controlId="password">

                <Form.Label
                  htmlFor="password"
                  className="form-label">
                  Password
                </Form.Label>
                <Form.Control
                  type="password"
                  className={`form-control ${errors.passwordErr && 'border-danger'} `}
                  name="password"
                  value={userData.password}
                  onChange={(e) => changeDetails(e)}
                />

                <p className="text-danger"> {errors.passwordErr} </p>
              </Form.Group>

              <div className="d-flex flex-column align-items-center">
                <Button
                  disabled={errors.usernameErr || errors.passwordErr}
                  type="submit"
                  className="primaryBtn">
                  Login
                </Button>
                <Link to="/register" className="m-2">Create an account</Link>
              </div>
            </Form>
          </div>
        </section>
      </div>
    </>
  );
}

export default SignIn;
