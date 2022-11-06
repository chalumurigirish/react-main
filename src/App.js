import { useEffect, useState } from 'react';
import axios from 'axios';

const Url = 'http://localhost:8888/';
function App() {
  const [todoTask, setTodoTask] = useState('');
  const [isEditing, setIsEditing] = useState(true);
  const [allTodo, setAllTodo] = useState([]);
  const task = ['hasura', 'NextJS', 'tailwind'];

  const getAllTodo = async () => {
    const requestOptions = {
      method: 'GET',
    };
    try {
      const response = await fetch(Url, requestOptions);
      const data = await response.json();
      setAllTodo(data);
    } catch (error) {
      console.log('error:', error);
    }
  };

  const createTodo = async () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ task: todoTask }),
    };
    try {
      const response = await fetch(Url, requestOptions);
      const newData = await response.json();
      // const newData = axios.post(Url, { task: todoTask });
      // console.log(response, newData);
      setAllTodo(newData);
    } catch (error) {
      console.log('error:', error);
    }
  };

  useEffect(() => {
    getAllTodo();
  }, []);
  console.log(allTodo);
  // return <div>Hello World</div>;
  return (
    <div>
      <form>
        <input
          type='text'
          placeholder='Enter Your ToDo'
          // required={true}
          value={todoTask}
          onChange={(e) => setTodoTask(e.target.value)}
        />
        {!isEditing ? (
          <button>update</button>
        ) : (
          <button onClick={createTodo}>add todo</button>
        )}
      </form>
      {allTodo?.allTodo?.map((task, index) => {
        return (
          <div key={index}>
            {`${task.task} `}
            <button
              disabled={isEditing}
              // onClick={() => removeTodo(currentUser?.fields?.todo[index])}
            >
              remove
            </button>
            <button
              disabled={isEditing}
              // onClick={() => editTodo(currentUser?.fields?.todo[index], task)}
            >
              edit
            </button>
          </div>
        );
      })}

      {/* {userId && (
        <div>
          {currentUser?.fields?.username}
          <button onClick={() => logout()}>Logout</button>
        </div>
      )} */}
    </div>
  );
}

export default App;
