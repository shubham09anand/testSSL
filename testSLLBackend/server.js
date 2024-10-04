const express = require("express");
const http = require("http");
const cors = require('cors');
const bodyParser = require('body-parser');

const connectDB = require("./connection.js");
const { createToDo } = require("./controller.js");
const { getAllToDos } = require("./getTask.js");
connectDB();

const app = express();
app.use(cors({
    origin: ['http://127.0.0.1:3000', 'http://localhost:3000'],  // Allowed frontend origins
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],  // Allowed methods
    optionsSuccessStatus: 200  // Status for successful OPTIONS request
}));

const server = http.createServer(app);
const port = process.env.PORT || 8080;

app.use(bodyParser.json({ limit: '100mb' }));
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// Include existing routes
app.post("/createTask", createToDo);
app.post("/todos", getAllToDos);

// Start the server on the defined port
server.listen(port, () => {
    console.log(`Server and Socket.IO are running on port ${port}`);
});
