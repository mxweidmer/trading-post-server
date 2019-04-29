const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");

/* router.get('/', function (req, res) {
    res.send("Hello from the users routes");
}); */

// Matches with "/api/users"
router.route("/")
    .get(usersController.findUsers)
    .post(usersController.addUser);

// Matches with "/api/users/:id"
/* router
.route("/:id")
.get(usersController.getUser);  */

module.exports = router;