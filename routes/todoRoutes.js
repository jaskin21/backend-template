const express = require('express');
const {
  registerUser,
  loginUser,
} = require('../authentication/userAuthentication');
const {
  createTodo,
  getTodoById,
  getAllTodos,
  updateTodo,
  deleteTodo,
} = require('../controller/todoController');

const router = express.Router();

// Get all todos
router.get('/', getAllTodos);

// Get a todo by ID
router.get('/:_id', getTodoById);

// Create a new todo
router.post('/', createTodo);

// Update an existing todo by ID
router.patch('/:_id', updateTodo);

// Delete a todo by ID
router.delete('/:_id', deleteTodo);

module.exports = router;