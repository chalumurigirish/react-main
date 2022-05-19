import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [allUsers, setAllUsers] = useState([]);

  const onSubmitHandler = e => {
    e.preventDefault();

    const requiredUser = allUsers.find(
      user => user.fields.username === username
    );

    if (!requiredUser) return alert('user does not exists');
    if (!(requiredUser.fields.password === password))
      return alert('password is incorrect');

    setUsername('');
    setPassword('');

    window.localStorage.setItem('userId', requiredUser.id);

    navigate('/todo');
  };

  useEffect(() => {
    const getAllUsers = async () => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASEURL}/users`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
          },
        }
      );

      setAllUsers(data.records);
    };

    getAllUsers();
  }, []);

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
        <button onClick={e => onSubmitHandler(e)}>Login</button>
      </form>
    </>
  );
};

export default Login;
