const Joi = require('joi');

exports.validateSignup = (data) => {
  const schema = Joi.object({
    username: Joi.string().required().min(2),
    email: Joi.string().required().min(6).email(),
    password: Joi.string().required().min(6),
  });
  return schema.validate(data);
};
exports.validateSignin = (data) => {
  const schema = Joi.object({
    email: Joi.string().required().min(6).email(),
    password: Joi.string().required().min(6),
  });
  return schema.validate(data);
};
exports.validateUpdate = (data) => {
  const schema = Joi.object({
    username: Joi.string().required().min(2),
  });
  return schema.validate(data);
};
exports.validateCategory = (data) => {
  const schema = Joi.object({
    name: Joi.string().required().min(2),
  });
  return schema.validate(data);
};
exports.validateProduct = (data) => {
  const schema = Joi.object({
    name: Joi.string().required().min(2).max(99),
    description: Joi.string().required().max(2000),
    price: Joi.number().required(),
    category: Joi.required(),
    quantity: Joi.number(),
    shipping: Joi.boolean(),
  });
  return schema.validate(data);
};
