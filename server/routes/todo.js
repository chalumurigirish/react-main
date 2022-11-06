import express from 'express';

import { getAllTodo, createTodo } from '../controllers/todo.js';

const router = express.Router();

router.get('/', getAllTodo);
router.post('/', createTodo);

export default router;
