const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoriesController");

router.route("/")
  .get(categoryController.getCategories)
  .post(categoryController.addCategory);

router.route("/:category")
  .get(categoryController.getCategory);

module.exports = router;