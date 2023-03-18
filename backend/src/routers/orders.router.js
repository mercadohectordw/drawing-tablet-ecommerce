const express = require('express');
const router = express.Router();
const { verifyTokenUser, verifyTokenAdmin } = require('../middleware/authorization');
const { getOrderData, verifyOrderBelongsToUser } = require('../middleware/orderValidations');
const { createOrderFromUser, getUserOrders, getAllOrders, getOrder, markOrderAsShipped, deleteOrder, getNumberOfOrders } = require('../controllers/orders.controller');
const { addressValidation } = require('../middleware/validation');

router.get("/user/", verifyTokenUser, getUserOrders);
router.get("/user/:orderId", verifyTokenUser, verifyOrderBelongsToUser, getOrder);
router.post("/user/", verifyTokenUser, addressValidation, getOrderData, createOrderFromUser);

router.get("/admin/all/:page", verifyTokenAdmin, getAllOrders);
router.get("/admin/:orderId", verifyTokenAdmin, getOrder);

router.put("/admin/:orderId", verifyTokenAdmin, markOrderAsShipped);
router.delete("/admin/:orderId", verifyTokenAdmin, deleteOrder);

module.exports = router;