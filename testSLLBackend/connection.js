const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const mongoUrl = "mongodb://localhost:27017/ToDolist";
        await mongoose.connect(mongoUrl);
        const db = mongoose.connection;
        console.log("Connection successful at server", db.host, "on port", db.port, "to database", db.name);
    } catch (error) {
        console.log(`Error in Database Connection: ${error}`);
    }
};

module.exports = connectDB;
