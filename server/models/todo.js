import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
  //   _id: 'string',
  task: 'string',
});

const Todo = mongoose.model('Todo', todoSchema);

export default Todo;
