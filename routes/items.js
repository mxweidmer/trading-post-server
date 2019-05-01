const express = require("express");
const router = express.Router();
const itemController = require("../controllers/itemsController");

router.route("/:sortMethod")
    .get(itemController.getAllItems)
router.route("/:itemId")
    .put(itemController.updateItem)
    .get(itemController.getSingleItem)
// .delete(itemController.deleteItem);
router.route("/:userId/:itemId")
    .post(itemController.addItem)
    .delete(itemController.deleteItem)

module.exports = router;