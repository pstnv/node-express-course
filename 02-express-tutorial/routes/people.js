const express = require("express");
const { getPeople, addPerson, getPerson, updatePerson, deletePerson } = require("../controllers/people");

const router = express.Router();

router.route("/").get(getPeople).post(addPerson);
router.route("/:id").get(getPerson).put(updatePerson).delete(deletePerson);

module.exports = router;
