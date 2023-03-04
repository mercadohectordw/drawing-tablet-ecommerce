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

const updateDataValidation = (req, res, next) => {
  let updateData = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email
  };

  let schema = joi.object({
    first_name: joi.string().required(),
    last_name: joi.string().required(),
    email: joi.string().email().required(),
  });

  let validation = schema.validate(updateData);
  if(validation.error){
    return res.status(400).send(validation.error);
  }

  next();
};

const updatePasswordValidation = (req, res, next) => {
  let updatePassword = {
    password: req.body.password
  };
  
  let schema = joi.object({
    password: joi.string().min(8).max(16).required()
  });

  let validation = schema.validate(updatePassword);
  if(validation.error){
    return res.status(400).send(validation.error);
  }

  next();
};

module.exports = {
  registerDataValidation, 
  loginDataValidation,
  updateDataValidation,
  updatePasswordValidation
}