const express = require('express');
const router = express.Router();
const {registerUser, loginUser, getUser} = require('../controllers/users.controller');
const {registerDataValidation, loginDataValidation} = require('../middleware/validation');
const {verifyTokenUser} = require('../middleware/authorization');

router.post("/register", registerDataValidation, registerUser);
router.post("/login", loginDataValidation, loginUser);

router.get("/profile", verifyTokenUser, getUser);

module.exports = router;