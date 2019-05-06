const express = require("express");
const router = express.Router();
const wishlistController = require("../controllers/wishlistController");


// Matches with "/api/wishlist/:id" where id is users id
router.route("/:userId/:itemId")
    .put(wishlistController.addWishlistItemUser);

router.route("/delete/:userId/:itemId")
    .put(wishlistController.deleteWishlistItem);
//wishitem should be deleted from the wishlist when it is deleted from the items (in the items controller)

module.exports = router;