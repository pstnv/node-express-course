const express = require("express");
const { login, dashboard } = require("../controllers/main");
const authentificationMiddleware = require("../middleware/auth");

const router = express.Router();

router.route("/dashboard").get(authentificationMiddleware, dashboard);
router.route("/login").post(login);

module.exports = router;
