import React, { useState } from 'react';
import './styles/App.css';
import useInputState from '../hooks/useInputState';
import axios from 'axios';
import { useCookies } from 'react-cookie';
function App() {
  const [user, setUser] = useState(null);
  const [cookies, setCookies, removeCookies] = useCookies(['token']);
  // console.log(token);
  const [
    registerUsername,
    handleRegisterUsername,
    resetRegisterUsername,
  ] = useInputState('');
  const [
    registerEmail,
    handleRegisterEmail,
    resetRegisterEmail,
  ] = useInputState('');
  const [
    registerPassword,
    handleRegisterPassword,
    resetRegisterPassword,
  ] = useInputState('');
  const [loginEmail, handleLoginEmail, resetLoginEmail] = useInputState('');
  const [
    loginPassword,
    handleLoginPassword,
    resetLoginPassword,
  ] = useInputState('');
  const handleSignUp = async (e) => {
    e.preventDefault();
    const response = await axios({
      method: 'post',
      url: 'http://localhost:5000/api/v1/auth/signup',
      data: {
        username: registerUsername,
        email: registerEmail,
        password: registerPassword,
      },
    });
    console.log(response.data);
    resetRegisterEmail();
    resetRegisterPassword();
    resetRegisterUsername();
  };
  const handleSignIn = async (e) => {
    e.preventDefault();
    const response = await axios({
      method: 'post',
      url: 'http://localhost:5000/api/v1/auth/signin',
      data: {
        email: loginEmail,
        password: loginPassword,
      },
      withCredentials: true,
    });
    console.log(response);
    if (response.data.error) return alert(response.data.error);
    setCookies('token', response.data.token);
    resetLoginEmail();
    resetLoginPassword();
  };
  const getUser = async () => {
    const response = await axios({
      method: 'get',
      url: 'http://localhost:5000/api/v1/user/secret',
      headers: {
        Authorization: `Bearer ${cookies.token}`,
      },
    }).catch((err) => {
      if (err) return alert('please sign in');
    });
    if (response) setUser(response.data.user);
  };
  const handleSignout = async () => {
    const response = await axios({
      method: 'get',
      url: 'http://localhost:5000/api/v1/auth/signout',
    });
    setUser(null);
    removeCookies(['token']);
    alert('bye bye');
  };
  return (
    <div className='App'>
      <h1>Current user: {user?.username}</h1>
      <form onSubmit={handleSignUp}>
        <h1>Sign Up</h1>
        <input
          name='username'
          placeholder='username'
          value={registerUsername}
          onChange={handleRegisterUsername}
        />
        <input
          type='email'
          name='email'
          placeholder='email'
          value={registerEmail}
          onChange={handleRegisterEmail}
        />
        <input
          type='password'
          name='password'
          placeholder='password'
          value={registerPassword}
          onChange={handleRegisterPassword}
        />
        <button type='submit'>Sign up</button>
      </form>
      <form onSubmit={handleSignIn}>
        <h1>Sign In</h1>
        <input
          type='email'
          name='email'
          placeholder='email'
          value={loginEmail}
          onChange={handleLoginEmail}
        />
        <input
          type='password'
          name='password'
          placeholder='password'
          value={loginPassword}
          onChange={handleLoginPassword}
        />
        <button type='submit'>Sign In</button>
      </form>
      <button onClick={getUser}>get user</button>
      <button onClick={handleSignout}>sign out</button>
    </div>
  );
}

export default App;
