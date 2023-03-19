const express = require('express');
const router = express.Router();
const { verifyTokenAdmin } = require('../middleware/authorization');
const { productValidation } = require('../middleware/validation');
const { getAllProducts, getProduct, getProductsByCategory, createProduct, updateProduct, deleteProduct, postNewProductImage, deleteOldProductImage, getProductsBySearch, getTheTopThreeBestSellers, changeProductVisibility } = require('../controllers/products.controller');
const { verifyThatTheProductHasNoSales } = require('../middleware/orderValidations');

router.get("/", verifyTokenAdmin, getAllProducts);
router.get("/admin/:productId", verifyTokenAdmin, getProduct);
router.get("/best", getTheTopThreeBestSellers);
router.get("/category/:categoryId", getProductsByCategory);
router.get("/search/:q", getProductsBySearch);
router.get("/:productId", getProduct);

router.post("/", verifyTokenAdmin, productValidation, createProduct);
router.put("/visibility/:productId", verifyTokenAdmin, changeProductVisibility);
router.put("/:productId", verifyTokenAdmin, productValidation, updateProduct);
router.delete("/:productId", verifyTokenAdmin, verifyThatTheProductHasNoSales, deleteProduct);

router.post("/image/:productId", verifyTokenAdmin, postNewProductImage);
router.delete("/image/:imageId", verifyTokenAdmin, deleteOldProductImage);

module.exports = router;