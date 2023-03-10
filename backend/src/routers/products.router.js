const express = require('express');
const router = express.Router();
const { verifyTokenAdmin } = require('../middleware/authorization');
const { productValidation } = require('../middleware/validation');
const { getAllProducts, getProduct, getProductsByCategory, createProduct, updateProduct, deleteProduct, postNewProductImage, deleteOldProductImage } = require('../controllers/products.controller');

router.get("/category/:categoryId", getProductsByCategory);
router.get("/:productId", getProduct);
router.get("/", getAllProducts);

router.post("/", verifyTokenAdmin, productValidation, createProduct);
router.put("/:productId", verifyTokenAdmin, productValidation, updateProduct);
router.delete("/:productId", verifyTokenAdmin, deleteProduct);

router.post("/image/:productId", verifyTokenAdmin, postNewProductImage);
router.delete("/image/:imageId", verifyTokenAdmin, deleteOldProductImage);

module.exports = router;