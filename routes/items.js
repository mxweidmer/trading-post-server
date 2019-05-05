const express = require("express");
const router = express.Router();
const itemController = require("../controllers/itemsController");

router.route("/:sortMethod")
    .get(itemController.getAllItems)
router.route("/:itemId")
    .put(itemController.updateItem)

// .delete(itemController.deleteItem);
router.route("/:userId/:itemId")
    .delete(itemController.deleteItem)

router.route("/:userId")
    .post(itemController.addItem)

router.route("/single/:itemId")
    .get(itemController.getSingleItem)

module.exports = router;