const Task = require("../models/Task");

const getAllTasks = (req, res) => {
    res.send("get all tasks");
};

const getTask = async (req, res) => {
    const { id } = req.params;
    res.json({ id });
};

const createTask = async (req, res) => {
    const { name, completed } = req.body;
    if (!name) {
        return res.status(500).json({ msg: "Provide a name" });
    }
    const task = await Task.create(req.body);
    res.status(201).json({ task });
};

const updateTask = async (req, res) => {
    res.send("update task");
};

const deleteTask = async (req, res) => {
    res.send("delete task");
};
module.exports = { getAllTasks, getTask, createTask, updateTask, deleteTask };
