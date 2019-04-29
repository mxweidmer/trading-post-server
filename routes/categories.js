const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");

router.get('/',function(req, res) {
    res.send("Hello from the categories routes");
  });

module.exports = router;