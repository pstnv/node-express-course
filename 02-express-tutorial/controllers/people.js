let { people } = require("../data");

const getPeople = (req, res) => {
    return res.status(200).json({ success: true, data: people });
};

const addPerson = (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res
            .status(400)
            .json({ success: false, message: "Please provide a name" });
    }
    people.push({ id: people.length + 1, name });
    return res.status(201).json({ success: true, name });
};

const getPerson = (req, res) => {
    const { id } = req.params;
    const person = people.find((person) => person.id === parseInt(id));
    if (!person) {
        return res.status(404).json({
            success: false,
            message: `Person with id ${id} does not exist`,
        });
    }
    return res.status(200).json({ success: true, data: person });
};

const updatePerson = (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const person = people.find((person) => person.id === parseInt(id));
    if (!person) {
        return res.status(404).json({
            success: false,
            message: `Person with id ${id} does not exist`,
        });
    }
    if (!name) {
        return res
            .status(400)
            .json({ success: false, message: "Please provide a name" });
    }
    people = people.map((person) => {
        if (person.id === parseInt(id)) {
            person.name = name;
        }
        return person;
    });
    return res.status(200).json({ success: true, data: people });
};

const deletePerson = (req, res) => {
    const { id } = req.params;
    const person = people.find((person) => person.id === parseInt(id));
    if (!person) {
        return res.status(404).json({
            success: false,
            message: `Person with id ${id} does not exist`,
        });
    }
    people = people.filter((person) => person.id !== parseInt(id));
    return res.status(200).json({ success: true, data: people });
};

module.exports = {
    getPeople,
    addPerson,
    getPerson,
    updatePerson,
    deletePerson,
};
