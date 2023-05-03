const joi = require('joi');

const getById = joi.object({
  id: joi.string().required(),
});

const getAll = joi.object({
  search: joi.string().optional().allow('',null).default(''),
  limit: joi.number().optional().allow('',null).default(999999999),
  page: joi.number().optional().allow('',null).default(1),
  sortBy: joi.string().valid('txtProductName','createdAt').optional().default('createdAt'),
  order: joi.string().valid('ASC','DESC').optional().default('ASC'),
});

const create = joi.object({
  txtProductCode: joi.string().required(),
  txtProductName: joi.string().required(),
  intQty: joi.string().required(),
  decPrice: joi.string().required(),
});

const update = joi.object({
  intProductID: joi.string().required(),
  txtProductCode: joi.string().required(),
  txtProductName: joi.string().required(),
  intQty: joi.string().required(),
  decPrice: joi.string().required(),
});

module.exports = {
  getById,
  getAll,
  create,
  update,
};
