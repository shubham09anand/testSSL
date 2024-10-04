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
    origin: ['https://testssl.shubham09anand.in','https://apitestssl.shubham09anand.in', 'https://13.202.210.238:3001', '*'],  // Allowed frontend origins
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],  // Allowed methods
    optionsSuccessStatus: 200  // Status for successful OPTIONS request
}));

const server = http.createServer(app);
const port = process.env.PORT || 8081;

app.use(bodyParser.json({ limit: '100mb' }));
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// Include existing routes
app.post("/createTask", createToDo);
app.post("/todos", getAllToDos);

app.get('/test', (req, res) => {
    res.json({ message: 'CORS enabled!' });
});

// Start the server on the defined port
server.listen(port, () => {
    console.log(`Server and Socket.IO are running on port ${port}`);
});
