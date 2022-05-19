import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Todo = () => {
  const navigate = useNavigate();

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
    },
  };

  const [userId, setUserId] = useState(null);
  const [currentTodoId, setCurrentTodoId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [todoTask, setTodoTask] = useState('');

  const onSubmitHandler = () => {
    const addingTodo = async () => {
      await axios.post(
        `${process.env.REACT_APP_BASEURL}/todos`,
        {
          fields: {
            task: todoTask,
            users: [userId],
          },
        },
        config
      );
    };

    addingTodo();
    setTodoTask('');
    getUserDetailsById(userId);
  };

  const onUpdateHandler = () => {
    const updateTodo = async () => {
      const response = await axios.put(
        `${process.env.REACT_APP_BASEURL}/todos/${currentTodoId}`,
        {
          fields: {
            task: todoTask,
            users: [userId],
          },
        },
        config
      );
      console.log(response);
    };
    updateTodo();
    setTodoTask('');
    getUserDetailsById(userId);
    setIsEditing(false);
  };

  const removeTodo = async id => {
    await axios.delete(
      `${process.env.REACT_APP_BASEURL}/todos/${id}`,

      config
    );

    getUserDetailsById(userId);
  };

  const editTodo = (id, task) => {
    setIsEditing(true);
    setTodoTask(task);
    setCurrentTodoId(id);
  };

  const logout = () => {
    window.localStorage.removeItem('userId');
    setUserId(null);
  };

  const getUserDetailsById = async id => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BASEURL}/users/${id}`,
      config
    );

    setCurrentUser(data);
  };

  useEffect(() => {
    const savedUserId = window.localStorage.getItem('userId');

    if (savedUserId) {
      setUserId(savedUserId);
      getUserDetailsById(savedUserId);
    } else {
      navigate('/login');
    }
  }, [userId]);

  return (
    <div>
      <form>
        <input
          type="text"
          placeholder="Enter Your ToDo"
          required={true}
          value={todoTask}
          onChange={e => setTodoTask(e.target.value)}
        />
        {isEditing ? (
          <button onClick={() => onUpdateHandler()}>update</button>
        ) : (
          <button onClick={() => onSubmitHandler()}>add todo</button>
        )}
      </form>
      {currentUser?.fields?.task.map((task, index) => {
        return (
          <div key={index}>
            {`${task} `}
            <button
              disabled={isEditing}
              onClick={() => removeTodo(currentUser?.fields?.todo[index])}
            >
              remove
            </button>
            <button
              disabled={isEditing}
              onClick={() => editTodo(currentUser?.fields?.todo[index], task)}
            >
              edit
            </button>
          </div>
        );
      })}

      {userId && (
        <div>
          {currentUser?.fields?.username}
          <button onClick={() => logout()}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default Todo;
