const jwt = require("jsonwebtoken");
const { BadRequestError } = require("../errors/index");

const login = (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        throw new BadRequestError("Please provide a email and password");
    }
    const id = new Date().getDate();
    const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });
    res.status(200).json({ msg: "user created", token });
};

const dashboard = async (req, res) => {
    // req.user comes from middleware function authentificationMiddleware
    const luckyNumber = Math.floor(Math.random() * 100);
    return res.status(200).json({
        msg: `Hello ${req.user.username}`,
        secret: `Here is your authorized data: ${luckyNumber}`,
    });
};

module.exports = { login, dashboard };
