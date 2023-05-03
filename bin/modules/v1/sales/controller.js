const {
  nanoid
} = require('nanoid');
const model = require('./model');
const path = require('path');
const util = require('util');
const fs = require('fs');
const config = require('../../../configs/config');
// const uploadController = require("../../../helpers/upload");

const getById = async (payload) => {
  const result = await model.findOne(payload)
  if (result.err) {
    return result;
  }

  return {
    err: null,
    data: result.data
  }
}

const getAll = async (payload) => {
  const result = await model.findAll(payload);
  if (result.err) {
    return result;
  }
  for (let i = 0; i < result.data.rows.length; i++) {
    if(result.data.rows[i].dataValues.intQty) {
      result.data.rows[i].dataValues.totalPrice = result.data.rows[i].dataValues.intQty * result.data.rows[i].dataValues.product.decPrice;
    }
  }

  result.data = {
    current_page: payload.page,
    page_size: result.data.rows.length < payload.limit ? result.data.rows.length : payload.limit,
    total_page: Math.ceil(result.data.count / payload.limit),
    ...result.data
  }

  return {
    err: null,
    data: result.data
  }
}

const create = async (payload) => {
  const insertObj = {
    intSalesOrderID: nanoid(),
    intCustomerID: payload.intCustomerID,
    intProductID: payload.intProductID,
    intQty: payload.intQty,
  };

  const insert = await model.insertOne(insertObj);
  const checkData = await model.findProduct(payload);
  if (checkData.err) {
    return checkData;
  }

  const updateObj = {
    intQty: checkData.data.dataValues.intQty - payload.intQty
  };

  const update = await model.updateProduct(updateObj, payload);
  if (update.err) {
    return update;
  }

  if (insert.err) {
    return insert;
  }

  return {
    err: null,
    data: insert.data
  }
}

const update = async (payload) => {
  const checkData = await model.findOne(payload)
  if (checkData.err) {
    return checkData;
  }

  const updateObj = {
    txtProductCode: payload.txtProductCode,
    txtProductName: payload.txtProductName,
    intQty: payload.intQty,
    decPrice: payload.decPrice
  };

  const update = await model.updateOne(updateObj, payload);
  if (update.err) {
    return update;
  }

  return {
    err: null,
    data: update.data
  }
}


const deleteOne = async (payload) => {
  const checkData = await model.findOne(payload)
  if (checkData.err) {
    return checkData;
  }

  const deleteOne = await model.deleteOne(payload);
  if (deleteOne.err) {
    return deleteOne;
  }

  return {
    err: null,
    data: deleteOne.data
  }
}

module.exports = {
  getById,
  getAll,
  create,
  update,
  deleteOne
}