const Joi = require('joi');

// Validation schema for creating a new Todo
const createTodoValidation = (data) => {
  const schema = Joi.object({
    title: Joi.string().min(3).max(255).required(),
    description: Joi.string().max(1024),
    completed: Joi.boolean(),
  });

  return schema.validate(data);
};

// Validation schema for updating an existing Todo
const updateTodoValidation = (data) => {
  const schema = Joi.object({
    title: Joi.string().min(3).max(255), // Optional, but if present, must be valid
    description: Joi.string().max(1024), // Optional
    completed: Joi.boolean(), // Optional
  }).min(1);

  return schema.validate(data);
};

module.exports = {
  createTodoValidation,
  updateTodoValidation,
};
