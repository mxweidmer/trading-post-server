const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoriesController");

router.route("/:category")
  .get(categoryController.getCategory);

router.route("/:category/:searchTerm")
  .get(categoryController.categorySearch)
module.exports = router;