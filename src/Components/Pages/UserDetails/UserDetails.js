import "./UserDetails.scss"
import { registerUser, updateUser } from '../../../services/authAPI';
import React, { useEffect, useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import AuthService from '../../../services/authAPI';
import authHeader from '../../../services/auth-header';
import UserService from '../../../services/user.service';
import { login } from '../../../redux/actions/auth';
import { DarkModeContext } from "../../../context/DarkMode";
import { useHistory, Redirect } from 'react-router-dom';

function UserDetails() {
  let { user } = useSelector(({ AuthReducer }) => AuthReducer);
  const { toggleDarkMode, darkMode } = useContext(DarkModeContext);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      history.push('/login');
    }
  }, [user])
  const [userData, setUserData] = useState({
    username: `${user.username}`,
    firstName: `${user.firstName}`,
    lastName: `${user.lastName}`,
    country: `${user.country}`,
    email: `${user.email}`,
    oldPassword: '',
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
    confirmPasswordErr: null,
    oldPasswordErr: ''
  });
  const emailRegex = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{3}');
  const passwordRegex = new RegExp(
    /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()+=-\?;,./{}|\":<>\[\]\\\' ~_]).{8,}/
  );

  const handleChange = (e) => {
    if (e.target.name === 'username') {
      setUserData({
        ...userData,
        username: e.target.value,
      });

      setError({
        ...error,
        usernameErr:
          e.target.value.length === 0
            ? 'This Field is Required'
            : e.target.value.length < 3
              ? 'please insert valid name'
              : null,
      });
    } else if (e.target.name === 'email') {
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
    } else if (e.target.name === 'userName') {
      setUserData({
        ...userData,
        userName: e.target.value,
      });
      setError({
        ...error,
        userNameErr:
          e.target.value.length === 0
            ? 'This Field is Required'
            : e.target.value.length < 3
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
        confirmPasswordErr: e.target.value !== userData.confirmPassword ? 'Confirm password incorrect !' : null,

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
            : e.target.value.length > 3
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
            : e.target.value.length > 3
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
            : e.target.value.length > 3
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
        birthdayErr:
          e.target.value.length === 0
            ? 'This Field is Required'
            : e.target.value.length > 3
              ? null
              : 'country not less than 3 characters ',
      });
    }
    else if (e.target.name === 'oldPassword') {
      setUserData({
        ...userData,
        oldPassword: e.target.value,
      });

      setError({
        ...error,
        oldPasswordErr:
          e.target.value.length === 0 ? 'Old Password required!' : null,
      });
    }
    else if (e.target.name === 'confirmPassword') {
      setError({
        ...error,
        confirmPasswordErr:
          e.target.value.length === 0 ? 'Confrim Password required!'
            : e.target.value !== userData.password
              ? 'Confirm password incorrect !'
              : null,
      });
    }
  };

  const updateData = (e) => {
    e.preventDefault();
    if (
      userData.username &&
      userData.password &&
      userData.firstName &&
      userData.lastName &&
      userData.email &&
      userData.birthday &&
      userData.country &&
      userData.oldPassword
    ) {
      console.log(userData)
      AuthService.update(userData, user.id).then(() => {
        setTimeout(() => {
          window.location.reload();
        }, 3000);

      })

    } else {
      toast.info(`You should to fill every field`, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };
  return (
    <div className={`userDetails user${darkMode}`}>
      <ToastContainer />
      <div className='container'>
        <div className='row'>
          <div className='userData col-md-3'>
            <div className='container'>
              <div >
                <table>
                  <tbody>
                  <tr className='userData_value'>
                    <td className='title'>UserName</td>
                    <td className='value'>
                      {user.username}
                    </td>
                  </tr>
                  <tr className='userData_value'>
                    <td className='title'> First Name</td>
                    <td className='value'>{user.firstName}</td>
                  </tr>
                  <tr className='userData_value'>
                    <td className='title'>Last Name:</td>
                    <td className='value'>{user.lastName}</td>
                  </tr>

                  <tr className='userData_value'>
                    <td className='title'>Email:</td>
                    <td className='value'>{user.email}</td>
                  </tr>
                  <tr className='userData_value'>
                    <td className='title'>Country</td>
                    <td className='value'>{user.country}</td>
                  </tr>
                  </tbody>
                </table>
              </div>




            </div>
          </div>
          <div className='userData_Update col-md-6'>
            <h3>Update Profile</h3>
            <form onSubmit={(e) => updateData(e)}>
              <div className="row">
                <div className="userDate_input col-md-5">
                  <label
                    htmlFor="username"
                    className="form-label">
                    User Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="username"
                    id="username"
                    value={userData.username}
                    onChange={(e) => handleChange(e)}
                  />
                  <p className="text-danger">{error.usernameErr}</p>
                </div>
                <div className="userDate_input col-md-5">
                  <label
                    htmlFor="firstName"
                    className="form-label">
                    First Name:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="firstName"
                    id="firstName"
                    value={userData.firstName}
                    onChange={(e) => handleChange(e)}
                  />
                  <p className="text-danger">{error.firstNameErr}</p>
                </div>
                <div className="userDate_input col-md-5">
                  <label
                    htmlFor="lastName"
                    className="form-label">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    className="form-control"
                    name="lastName"
                    value={userData.lastName}
                    onChange={(e) => handleChange(e)}
                  />
                  <p className="text-danger">{error.lastNameErr}</p>
                </div>

                <div className="userDate_input col-md-5">
                  <label
                    htmlFor="email"
                    className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    id="email"
                    value={userData.email}
                    onChange={(e) => handleChange(e)}
                  />
                  <p className="text-danger">{error.emailErr}</p>
                </div>
                <div className="userDate_input col-md-5">
                  <label
                    htmlFor="birthday"
                    className="form-label">
                    Birthday
                  </label>
                  <input
                    min="1920-01-01"
                    max="2010-12-31"
                    type="date"
                    id="birthday"
                    className="form-control"
                    name="birthday"
                    value={userData.birthday}
                    onChange={(e) => handleChange(e)}
                  />
                  <p className="text-danger">{error.emailErr}</p>
                </div>

                <div className="userDate_input col-md-5">
                  <label
                    htmlFor="country"
                    className="form-label">
                    Country
                  </label>
                  <input
                    type="text"
                    id="country"
                    className="form-control"
                    name="country"
                    value={userData.country}
                    onChange={(e) => handleChange(e)}
                  />
                  <p className="text-danger">{error.countryErr}</p>
                </div>
                <div className="userDate_input col-md-5">
                  <label
                    htmlFor="oldPassword"
                    className="form-label">
                    Old Password
                  </label>
                  <input
                    type="password"
                    id="oldPassword"
                    className="form-control"
                    name="oldPassword"
                    value={userData.oldPassword}
                    onChange={(e) => handleChange(e)}
                  />
                  <p className="text-danger">{error.oldPasswordErr}</p>
                </div>
                <br />
                <div className="userDate_input col-md-5">
                  <label
                    htmlFor="password"
                    className="form-label">
                    New Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="form-control"
                    name="password"
                    value={userData.password}
                    onChange={(e) => handleChange(e)}
                  />
                  <p className="text-danger">{error.passwordErr}</p>
                </div>
                <div className="userDate_input col-md-5">
                  <label
                    htmlFor="confirmPassword"
                    className="form-label">
                    Confrim Password
                  </label>
                  <input
                    id="confirmPassword"
                    type="password"
                    className="form-control"
                    name="confirmPassword"
                    value={userData.confirmPassword}
                    onChange={(e) => handleChange(e)}
                  />
                  <p className="text-danger">{error.confirmPasswordErr}</p>
                </div>
              </div>
              <button
                type="submit"
                className="orangeBtn">
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDetails;
