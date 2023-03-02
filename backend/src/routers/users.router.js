const express = require('express');
const router = express.Router();
const {registerUser, loginUser} = require('../controllers/users.controller');
const {registerDataValidation, loginDataValidation} = require('../middleware/validation');


router.post("/register", registerDataValidation, registerUser);
router.post("/login", loginDataValidation, loginUser);

module.exports = router;