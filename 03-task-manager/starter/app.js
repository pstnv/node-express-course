const express = require("express");
const connectDB = require("./db/connect");
const tasks = require("./routes/tasks");

require("dotenv").config();

const app = express();

// middleware
app.use(express.json());
app.use("/api/v1/tasks", tasks);

// routes
app.get("/hello", (req, res) => {
    res.send("Task Manager App");
});


const port = 3000;
// const port = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;
const start = async () => {
    try {
        await connectDB(MONGO_URI);
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}`);
        });
    } catch (error) {
        console.log(error);
    }
};

start();
