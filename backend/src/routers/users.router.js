const express = require('express');
const router = express.Router();
const {registerUser, loginUser, getUser, getAllUsers} = require('../controllers/users.controller');
const {registerDataValidation, loginDataValidation} = require('../middleware/validation');
const {verifyTokenUser, verifyTokenAdmin} = require('../middleware/authorization');

router.get("/", verifyTokenAdmin, getAllUsers);
router.get("/profile", verifyTokenUser, getUser);

router.post("/register", registerDataValidation, registerUser);
router.post("/login", loginDataValidation, loginUser);


module.exports = router;