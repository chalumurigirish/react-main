import React from 'react';
import { useState } from 'react';
import axios from 'axios';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onSubmitHandler = e => {
    e.preventDefault();

    const addingUser = async () => {
      await axios.post(
        `${process.env.REACT_APP_BASEURL}/users`,
        {
          fields: {
            username: username,
            password: password,
          },
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
          },
        }
      );

      setUsername('');
      setPassword('');
    };

    addingUser();
  };

  return (
    <>
      <form>
        <input
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
          placeholder="Enter your username"
        />

        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Enter your password"
        />
        <button onClick={e => onSubmitHandler(e)}>signup</button>
      </form>
    </>
  );
};

export default Signup;
