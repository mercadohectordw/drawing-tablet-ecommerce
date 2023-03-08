const express = require('express');
const router = express.Router();
const { verifyTokenUser, verifyTokenAdmin } = require('../middleware/authorization');
const { getOrderData, verifyOrderBelongsToUser } = require('../middleware/orderValidations');
const { createOrderFromUser, getUserOrders, getAllOrders, getOrder } = require('../controllers/orders');
const { addressValidation } = require('../middleware/validation');

router.get("/user/", verifyTokenUser, getUserOrders);
router.get("/user/:orderId", verifyTokenUser, verifyOrderBelongsToUser, getOrder);
router.post("/user/", verifyTokenUser, addressValidation, getOrderData, createOrderFromUser);

router.get("/", verifyTokenAdmin, getAllOrders);
router.get("/:orderId", verifyTokenAdmin, getOrder);

router.post("/", verifyTokenAdmin, );
router.put("/:orderId", verifyTokenAdmin, );
router.delete("/:orderId", verifyTokenAdmin, );

module.exports = router;