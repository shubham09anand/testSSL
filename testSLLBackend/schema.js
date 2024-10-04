const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema(
  {
    userID: {
      type: String,
      required: true,
    },
    task: {
      type: String,
      required: true,
    },
    dateTime: {
      type: String,  // You can also use 'Date' type if you prefer
      required: true,
    },
  },
  { timestamps: true }  // This will add `createdAt` and `updatedAt` timestamps automatically
);

const Todo = mongoose.model('Todo', todoSchema, 'TodoCollection');

module.exports = Todo;
