const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");


// Matches with "/api/users"
router.route("/")
    .get(usersController.findUsers)
    .post(usersController.addUser);

// Matches with "/api/users/:id"
router.route("/:id")
    .get(usersController.getUser)
    .put(usersController.updateUser);

module.exports = router;