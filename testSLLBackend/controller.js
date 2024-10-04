const ToDoList = require("./schema");

const createToDo = async (req, res) => {
  try {
    const todoData = req.body;

    // Create a new ToDo item in the database
    await ToDoList.create(todoData);

    res.status(200).json({
      message: 'ToDo Created Successfully',
      status: 1,
    });

  } catch (error) {
    console.error('Error Creating ToDo:', error);
    res.status(500).json({
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};

module.exports = { createToDo };
