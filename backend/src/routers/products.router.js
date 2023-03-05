const express = require('express');
const router = express.Router();
const {verifyTokenUser, verifyTokenAdmin} = require('../middleware/authorization');
const { productValidation } = require('../middleware/validation');
const { getAllProducts, getProduct, getProductsByCategory, createProduct, updateProduct, deleteProduct } = require('../controllers/products.controller');

router.get("/category/:categoryId", getProductsByCategory);
router.get("/:productId", getProduct);
router.get("/", getAllProducts);

router.post("/", verifyTokenAdmin, productValidation, createProduct);
router.put("/:productId", verifyTokenAdmin, productValidation, updateProduct);
router.delete("/:productId", verifyTokenAdmin, deleteProduct);

module.exports = router;