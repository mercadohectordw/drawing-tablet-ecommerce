const express = require('express');
const router = express.Router();
const {registerUser, loginUser, getUser, getAllUsers, updateUserData, updateUserPassword} = require('../controllers/users.controller');
const {registerDataValidation, loginDataValidation, updateDataValidation, updatePasswordValidation} = require('../middleware/validation');
const {verifyTokenUser, verifyTokenAdmin} = require('../middleware/authorization');

router.get("/", verifyTokenAdmin, getAllUsers);
router.get("/profile", verifyTokenUser, getUser);
router.put("/update", updateDataValidation, verifyTokenUser, updateUserData);
router.put("/update/password", updatePasswordValidation, verifyTokenUser, updateUserPassword);

router.post("/register", registerDataValidation, registerUser);
router.post("/login", loginDataValidation, loginUser);


module.exports = router;