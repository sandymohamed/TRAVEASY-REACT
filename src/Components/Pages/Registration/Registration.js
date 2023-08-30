import { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../../redux/actions/auth';

function Registration() {
  const dispatch = useDispatch();
  const history = useHistory();
  let { isRegistered } = useSelector(({ AuthReducer }) => AuthReducer);
  let { message } = useSelector((MessageReducer) => MessageReducer);

  useEffect(() => {
    if (isRegistered === true) {
      history.push('/login');
    }
  }, [isRegistered]);

  const [userData, setUserData] = useState({
    username: '',
    firstName: '',
    lastName: '',
    country: '',
    email: '',
    password: '',
    birthday: '',
  });
  const [error, setError] = useState({
    firstNameErr: null,
    lastNameErr: null,
    countryErr: null,
    emailErr: null,
    usernameErr: null,
    passwordErr: null,
    birthdayErr: null,
  });
  const emailRegex = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{3}');
  const passwordRegex = new RegExp(/(?=.*\d)(?=.*[a-z])(?=.*[!@#$%^&*()+=-\?;,./{}|\":<>\[\]\\\' ~_]).{8,}/);

  const handleChange = (e) => {
    if (e.target.name === 'email') {
      setUserData({
        ...userData,
        email: e.target.value,
      });
      setError({
        ...error,
        emailErr:
          e.target.value.length === 0
            ? 'This Field is Required'
            : emailRegex.test(e.target.value)
              ? null
              : 'email format must be xxx@xxxx.com',
      });
    } else if (e.target.name === 'username') {
      setUserData({
        ...userData,
        username: e.target.value,
      });
      setError({
        ...error,
        usernameErr:
          e.target.value.length === 0
            ? 'This Field is Required'
            : e.target.value.length <= 3
              ? 'please insert valid user name'
              : null,
      });
    } else if (e.target.name === 'password') {
      setUserData({
        ...userData,
        password: e.target.value,
      });
      setError({
        ...error,
        passwordErr:
          e.target.value.length === 0
            ? 'This Field is Required'
            : passwordRegex.test(e.target.value)
              ? null
              : 'password length not less than 8 characters contains at least one lowercase , one uppercase , at least one digit and special character [ example : *@%$#] ',
      });
    } else if (e.target.name === 'firstName') {
      setUserData({
        ...userData,
        firstName: e.target.value,
      });
      setError({
        ...error,
        firstNameErr:
          e.target.value.length === 0
            ? 'This Field is Required'
            : e.target.value.length >= 3
              ? null
              : 'first name 3 characters ',
      });
    } else if (e.target.name === 'lastName') {
      setUserData({
        ...userData,
        lastName: e.target.value,
      });
      setError({
        ...error,
        lastNameErr:
          e.target.value.length === 0
            ? 'This Field is Required'
            : e.target.value.length >= 3
              ? null
              : 'last name 3 characters ',
      });
    } else if (e.target.name === 'country') {
      setUserData({
        ...userData,
        country: e.target.value,
      });
      setError({
        ...error,
        countryErr:
          e.target.value.length === 0
            ? 'This Field is Required'
            : e.target.value.length >= 3
              ? null
              : 'country not less than 3 characters ',
      });
    } else if (e.target.name === 'birthday') {
      setUserData({
        ...userData,
        birthday: e.target.value,
      });
      setError({
        ...error,
        birthdayErr: e.target.value.length === 0 ? 'This Field is Required' : null,
      });
    }
  };

  const submitData = (e) => {
    e.preventDefault();
    if (
      userData.username &&
      userData.password &&
      userData.firstName &&
      userData.lastName &&
      userData.email &&
      userData.birthday &&
      userData.country
    ) {
      try {
        dispatch(register(userData));
      } catch (error) {
        toast.info(`Something Wrong here!`, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    } else {
      toast.info(`You should to fill every field`, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };
  return (
    <div className="page-holder align-items-center py-4 bg-gray-100 ">
      <div className="container">
        <div className="row align-items-center">
          <ToastContainer />
          <div className="col-lg-6 px-lg-4">
            <div className="card">
              
              <div className="card-body p-lg-5">
                <h3 className="mb-4">Get started</h3>
                <form onSubmit={(e) => submitData(e)}>
                  <div className="mb-3">
                    <label
                      htmlFor="firstName"
                      className="form-label">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="firstName"
                      value={userData.firstName}
                      onChange={(e) => handleChange(e)}
                    />
                    <p className="text-danger">{error.firstNameErr}</p>
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="lastName"
                      className="form-label">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="lastName"
                      value={userData.lastName}
                      onChange={(e) => handleChange(e)}
                    />
                    <p className="text-danger">{error.lastNameErr}</p>
                  </div>

                  <div className="mb-3">
                    <label
                      htmlFor="exampleInputEmail1"
                      className="form-label">
                      Email address
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={userData.email}
                      onChange={(e) => handleChange(e)}
                    />
                    <p className="text-danger">{error.emailErr}</p>
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="birthday"
                      className="form-label">
                      Birthday
                    </label>
                    <input
                      min="1920-01-01"
                      max="2010-12-31"
                      type="date"
                      className="form-control"
                      name="birthday"
                      value={userData.birthday}
                      onChange={(e) => handleChange(e)}
                    />
                    <p className="text-danger">{error.birthdayErr}</p>
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="username"
                      className="form-label">
                      User Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="username"
                      value={userData.username}
                      onChange={(e) => handleChange(e)}
                    />
                    <p className="text-danger">{error.usernameErr}</p>
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="country"
                      className="form-label">
                      Country
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="country"
                      value={userData.country}
                      onChange={(e) => handleChange(e)}
                    />
                    <p className="text-danger">{error.countryErr}</p>
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="exampleInputPassword1"
                      className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      value={userData.password}
                      onChange={(e) => handleChange(e)}
                    />
                    <p className="text-danger">{error.passwordErr}</p>
                  </div>
                  {message && (
                    <div className="form-group">
                      <div
                        className={isRegistered ? 'alert alert-success' : 'alert alert-danger'}
                        role="alert">
                        {message}
                      </div>
                    </div>
                  )}
                  <button
                    type="submit"
                    className="btn btn-primary me-5"
                    disabled={
                      error.usernameErr ||
                      error.passwordErr ||
                      error.firstNameErr ||
                      error.lastNameErr ||
                      error.emailErr ||
                      error.birthdayErr ||
                      error.countryErr
                    }>
                    Submit
                  </button>
                  <Link to="/login">Have an account</Link>
                </form>
              </div>
            </div>
          </div>
          <div className="d-none d-lg-block col-lg-6 col-xl-5 ms-xl-auto px-lg-4 text-center text-primary"><img className="img-fluid mb-4" width="300"
            src="https://img.freepik.com/free-vector/vacation-holidays-background-with-realistic-globe-suitcase-photo-camera_1284-10476.jpg?1?w=360"
            alt="" style={{ transform: 'rotate(10deg)' }} />
            <h1 className="mb-4">Traveasy.com <br className="d-none d-lg-inline" />Vacation become easier.</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registration;
