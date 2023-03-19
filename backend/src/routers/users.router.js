const express = require('express');
const router = express.Router();
const {registerUser, loginUser, getUser, getAllUsers, updateUserData, updateUserPassword, assignNewAdmin, deleteAdmin, getDashboard, getUserForAdmin} = require('../controllers/users.controller');
const {registerDataValidation, loginDataValidation, updateDataValidation, updatePasswordValidation} = require('../middleware/validation');
const {verifyTokenUser, verifyTokenAdmin} = require('../middleware/authorization');

router.get("/profile", verifyTokenUser, getUser);
router.put("/update", verifyTokenUser, updateDataValidation, updateUserData);
router.put("/update/password", verifyTokenUser, updatePasswordValidation, updateUserPassword);

router.post("/register", registerDataValidation, registerUser);
router.post("/login", loginDataValidation, loginUser);

router.get("/admin/dashboard", verifyTokenAdmin, getDashboard);
router.get("/admin/:userId", verifyTokenAdmin, getUserForAdmin);
router.post("/admin/:userId", verifyTokenAdmin, assignNewAdmin);
router.delete("/admin/:userId", verifyTokenAdmin, deleteAdmin);
router.get("/:page", verifyTokenAdmin, getAllUsers);

module.exports = router;