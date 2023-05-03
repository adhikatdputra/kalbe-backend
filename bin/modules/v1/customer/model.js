const validate = require('validate.js');
const Customer = require('../../../helpers/databases/mysql/model/Customer');
const connSequelize = require('../../../helpers/databases/mysql/connection');
const sequelize = require('sequelize');
const Op = sequelize.Op;

const findAll = async (payload) => {
  const ctx = 'findAll';
    try {
      let order = [[payload.sortBy,payload.order]];
      if(payload.sortBy != 'createdAt') {
        order = [[sequelize.fn('lower', sequelize.col(`tbl_customer.${payload.sortBy}`)),payload.order]];
      }
      let query = {
        where: {},
        offset: (payload.page - 1) * payload.limit,
        limit: payload.limit,
        order: order,
      }
      if(payload.search) {
        query.where = {
          [Op.or]: [{
            txtCustomerName: {
              [Op.like]: `%${payload.search}%`
            },
          }]
        };
      }

      const result = await Customer.findAndCountAll(query);
      return {
        err: null,
        data: result
      }
    } catch (error) {
      console.log(ctx, error, 'Catch Error');
      return {
        err: { message: 'Internal Server Error!', code: 500 },
        data: null
      }
    }
}

const findOne = async (payload) => {
  const ctx = 'findOne';
    try {
      const result = await Customer.findOne({
        where: {
          intCustomerID: payload.id
        },
      });
      if(validate.isEmpty(result)) {
        console.log(ctx, result, 'isEmpty');
        return {
          err: { message: 'Customer not found!', code: 404 },
          data: null
        }
      }
      return {
        err: null,
        data: result
      }
    } catch (error) {
      console.log(ctx, error, 'Catch Error');
      return {
        err: { message: 'Internal Server Error!', code: 500 },
        data: null
      }
    }
}

const insertOne = async (payload) => {
  const ctx = 'insertOne';
    try {
      await Customer.create(payload);
      const result = await Customer.findOne({
        where: {
          intCustomerID: payload.intCustomerID
        },
      });
      return {
        err: null,
        data: result
      }
    } catch (error) {
      console.log(ctx, error, 'Catch Error');
      return {
        err: { message: 'Internal Server Error!', code: 500 },
        data: null
      }
    }
}

const updateOne = async (value, payload) => {
  const ctx = 'updateOne';
    try {
      await Customer.update(value, {
        where: {
          intCustomerID: payload.id
        }
      });
      const result = await Customer.findOne({
        where: {
          intCustomerID: payload.id
        },
      });
      if(validate.isEmpty(result)) {
        console.log(ctx, result, 'isEmpty');
        return {
          err: { message: 'Data not found!', code: 404 },
          data: null
        }
      }
      return {
        err: null,
        data: result
      }
    } catch (error) {
      console.log(ctx, error, 'Catch Error');
      return {
        err: { message: 'Internal Server Error!', code: 500 },
        data: null
      }
    }
}

const deleteOne = async (payload) => {
  const ctx = 'deleteOne';
    try {
      await Customer.destroy({
        where: {
          intCustomerID: payload.id
        }
      });
      return {
        err: null,
        data: ''
      }
    } catch (error) {
      console.log(ctx, error, 'Catch Error');
      return {
        err: { message: 'Internal Server Error!', code: 500 },
        data: null
      }
    }
}

module.exports = {
  findAll,
  findOne,
  insertOne,
  updateOne,
  deleteOne
}