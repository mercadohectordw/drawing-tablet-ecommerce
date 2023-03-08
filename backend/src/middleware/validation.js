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

const productValidation = (req, res, next) => {
  let data = {
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    main_image: req.body.main_image,
    category_id: req.body.category_id,
    inventory: req.body.inventory
  };

  let schema = joi.object({
    name: joi.string().max(255).required(),
    description: joi.string().max(255).required(),
    price: joi.number().positive().required(),
    main_image: joi.string().max(255),
    category_id: joi.number().integer().positive().required(),
    inventory: joi.number().integer().required()
  });

  let validation = schema.validate(data);
  if(validation.error){
    return res.status(400).send(validation.error);
  }

  next();
};

const addressValidation = (req, res, next) => {
  let addressData = req.body.shipping_address;

  let schema = joi.object({
    address_line: joi.string().max(255).required(),
    city: joi.string().max(200).required(),
    province: joi.string().max(200).required(),
    country: joi.string().max(100).required(),
    postal_code: joi.string().max(8).required(),
    mobile: joi.string().max(14).required()
  });

  let validation = schema.validate(addressData);
  if(validation.error){
    return res.status(400).send(validation.error);
  }

  next();
};

module.exports = {
  registerDataValidation, 
  loginDataValidation,
  updateDataValidation,
  updatePasswordValidation,
  productValidation,
  addressValidation
}