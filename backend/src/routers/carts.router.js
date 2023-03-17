const express = require('express');
const { verifyTokenUser, verifyTokenAdmin } = require('../middleware/authorization');
const { verifyUserCart } = require('../middleware/userCart');
const { addItem, getCart, deleteItem, updateItem } = require('../controllers/carts.controller');
const router = express.Router();

router.get("/", verifyTokenUser, getCart);
router.post("/items/:productId", verifyTokenUser, verifyUserCart, addItem);
router.put("/items/:cartItemId", verifyTokenUser, updateItem);
router.delete("/items/:cartItemId", verifyTokenUser, deleteItem);

router.get("/admin/", verifyTokenAdmin, );
router.get("/admin/:userId", verifyTokenAdmin, );

module.exports = router;