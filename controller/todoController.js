// controllers/todoController.js

const Todo = require('../model/todoModel');
const { errorResponseFactory } = require('../utils/errorResponseFactory');
const { responseFactory } = require('../utils/responseFactory');
const { todoValidation, updateTodoValidation } = require('../validation/todoValidation');

// Get all todos
const getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find(); // Fetch all todos from the database
    return responseFactory(res, 200, { todos });
  } catch (error) {
    return errorResponseFactory(
      res,
      400,
      error?.message ?? 'Something went wrong, please try again'
    );
  }
};

// Get a todo by ID
const getTodoById = async (req, res) => {
  try {
    const todos = await Todo.findOne({ _id: req.params._id });
    return responseFactory(res, 200, { todo: todos });
  } catch (error) {
    return errorResponseFactory(
      res,
      400,
      error?.message ?? 'Something went wrong, please try again'
    );
  }
};

// Create a new todo
const createTodo = async (req, res) => {
  // Validate the request body
  const { error } = todoValidation(req.body);
  if (error) {
    return errorResponseFactory(
      res,
      400, // Bad Request
      error.details[0].message,
      { details: error.details }
    );
  }

  // Create a new todo instance
  const newTodo = new Todo({
    ...req.body,
  });

  try {
    const savedTodo = await newTodo.save();
    return responseFactory(res, 201, { todo: savedTodo });
  } catch (error) {
    return errorResponseFactory(
      res,
      400,
      error?.message ?? 'Failed to create todo'
    );
  }
};

// Update an existing todo
const updateTodo = async (req, res) => {
  // Validate the request body to ensure only allowed fields are updated
  const { error } = updateTodoValidation(req.body);
  if (error) {
    return errorResponseFactory(
      res,
      400, // Bad Request
      error.details[0].message,
      { details: error.details }
    );
  }

  try {
    const updatedTodo = await Todo.findByIdAndUpdate(req.params._id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedTodo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    return responseFactory(res, 200, { updated: updatedTodo });
  } catch (error) {
    return errorResponseFactory(
      res,
      400,
      error?.message ?? 'Failed to update todo'
    );
  }
};

// Delete a todo
const deleteTodo = async (req, res) => {
  try {
    const deletedTodo = await Todo.findByIdAndDelete({ _id: req.params._id });

    if (!deletedTodo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    return responseFactory(res, 200, { deletedTodo });
  } catch (error) {
    return errorResponseFactory(
      res,
      400,
      error?.message ?? 'Something went wrong, please try again'
    );
  }
};

module.exports = {
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
};
