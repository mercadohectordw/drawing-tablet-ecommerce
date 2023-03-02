const joi = require('joi');

const registerDataValidation = (req, res, next) => {
  let userData = req.body;

  let schema = joi.object({
    first_name: joi.string().required(),
    last_name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().min(8).max(16).required()
  });

  let validation = schema.validate(userData);
  if(validation.error){
    return res.status(400).send(validation.error);
  }

  next();
};

const loginDataValidation = (req, res, next) => {
  let logData = req.body;

  let schema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(8).max(16).required()
  });

  let validation = schema.validate(logData);
  if(validation.error){
    return res.status(400).send(validation.error);
  }

  next();
};

module.exports = {
  registerDataValidation, 
  loginDataValidation
}