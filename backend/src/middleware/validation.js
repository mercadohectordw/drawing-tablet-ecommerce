const joi = require('joi');

const registerValidation = (userData) => {
  let schema = joi.object({
    first_name: joi.string().required(),
    last_name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().min(8).max(16).required()
  });

  return schema.validate(userData);
};

const loginValidation = (logData) => {
  let schema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(8).max(16).required()
  });

  return schema.validate(logData);
};

module.exports = {
  registerValidation, 
  loginValidation
}