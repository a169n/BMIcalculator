const express = require("express");
const { getUsers, postUser } = require("../controllers/userController");
const { deleteById, deleteAll } = require("../controllers/deleteController");
const router = express.Router();

router.get("/users", getUsers);
router.post("", postUser);
router.delete("/users/:id", deleteById);
router.delete("/users", deleteAll);

module.exports = router;
