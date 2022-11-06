import Todo from '../models/todo.js';

export const getAllTodo = async (req, res) => {
  try {
    const allTodo = await Todo.find();
    res.status(200).json({ error: false, allTodo });
  } catch (error) {
    res.status(404).json({ error: true, message: error.message });
  }
};

export const createTodo = async (req, res) => {
  console.log(req.body);
  const { task } = req.body;
  const todo = new Todo({ task });

  try {
    await todo.save();
    res.status(201).json({ error: false, todo });
  } catch (error) {
    res.status(409).json({ error: true, message: error.message });
  }
};

// export const editTodo = async (req,res) => {
//     const {task} = req.body
//     try {
//         const todo = await Todo.find
//     } catch (error) {

//     }
// }
