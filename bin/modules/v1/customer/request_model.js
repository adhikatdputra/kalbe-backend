const joi = require('joi');

const getById = joi.object({
  id: joi.string().required(),
});

const getAll = joi.object({
  search: joi.string().optional().allow('',null).default(''),
  limit: joi.number().optional().allow('',null).default(999999999),
  page: joi.number().optional().allow('',null).default(1),
  sortBy: joi.string().valid('txtCustomerName','createdAt').optional().default('txtCustomerName'),
  order: joi.string().valid('ASC','DESC').optional().default('ASC'),
});

const create = joi.object({
  txtCustomerName: joi.string().required(),
  txtCustomerAddress: joi.string().required(),
  bitGender: joi.string().required(),
  dtmBirthDate: joi.string().optional().allow("", null),
});

const update = joi.object({
  intCustomerID: joi.string().required(),
  txtCustomerName: joi.string().required(),
  txtCustomerAddress: joi.string().required(),
  bitGender: joi.string().required(),
  dtmBirthDate: joi.string().optional().allow("", null),
});

module.exports = {
  getById,
  getAll,
  create,
  update,
};
