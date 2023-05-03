const joi = require('joi');

const getById = joi.object({
  id: joi.string().required(),
});

const getAll = joi.object({
  id: joi.string().optional().allow('',null).default(''),
  search: joi.string().optional().allow('',null).default(''),
  limit: joi.number().optional().allow('',null).default(999999999),
  page: joi.number().optional().allow('',null).default(1),
  sortBy: joi.string().valid('intProductID','createdAt').optional().default('createdAt'),
  order: joi.string().valid('ASC','DESC').optional().default('ASC'),
});

const create = joi.object({
  intCustomerID: joi.string().required(),
  intProductID: joi.string().required(),
  intQty: joi.string().required(),
});

const update = joi.object({
  intSalesOrderID: joi.string().required(),
  intCustomerID: joi.string().required(),
  intProductID: joi.string().required(),
  intQty: joi.string().required(),
});

module.exports = {
  getById,
  getAll,
  create,
  update,
};
