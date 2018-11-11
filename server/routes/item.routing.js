const express = require("express");
const router = express.Router();

const ItemController = require("../controllers/item.controller");
const checkAuth = require("../middlewares/check-auth.middleware");

router.get('/', ItemController.getItems);
router.get('/:userId/wishlist', checkAuth, ItemController.getWishListItems);
router.put('/:userId/wishlist/:itemId', checkAuth, ItemController.addToWishList);
router.delete('/:userId/wishlist/:itemId', checkAuth, ItemController.removeFromWishList);

module.exports = router;