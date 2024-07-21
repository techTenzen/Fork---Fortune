import React, { useContext, useState } from 'react';
import { assets } from '../../assets/assets';
import './LoginPopup.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const LoginPopup = () => {
  const { url, setToken, fetchCartItems, setShowLogin } =
    useContext(StoreContext);
  const [currState, setCurrState] = useState('Login');
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onLogin = async (e) => {
    e.preventDefault();
    try {
      let newUrl = url;
      if (currState === 'Login') {
        newUrl += '/api/user/login';
      } else {
        newUrl += '/api/user/register';
      }
      const response = await axios.post(newUrl, data);
      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem('token', response.data.token);
        fetchCartItems(response.data.token);
        setShowLogin(false);
      } else {
        alert(response.data.msg);
      }
    } catch (error) {}
  };

  return (
    <div className="login-popup">
      <form className="container-login-popup" onSubmit={onLogin}>
        <div className="title-login-popup">
          <h2>{currState}</h2>
          <img
            src={assets.cross_icon}
            alt=""
            onClick={() => setShowLogin(false)}
          />
        </div>
        <div className="inputs-login-popup">
          {currState === 'Login' ? (
            <></>
          ) : (
            <input
              type="text"
              placeholder="Your name"
              name="name"
              value={data.name}
              onChange={onChangeHandler}
              required
            />
          )}
          <input
            type="email"
            placeholder="Your email"
            name="email"
            value={data.email}
            onChange={onChangeHandler}
            required
          />
          <input
            type="password"
            placeholder="Your password"
            name="password"
            value={data.password}
            onChange={onChangeHandler}
            required
          />
        </div>
        <button type="submit">{currState}</button>
        <div className="condition-login-popup">
          <input type="checkbox" required />
          <p>By continuing, i agree to the terms of use & privacy policy.</p>
        </div>
        {currState === 'Login' ? (
          <p>
            Create a new account?
            <span onClick={() => setCurrState('Sign Up')}>Click here</span>
          </p>
        ) : (
          <p>
            Already have an account?
            <span onClick={() => setCurrState('Login')}>Click here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export { LoginPopup };
