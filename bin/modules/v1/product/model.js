const validate = require('validate.js');
const Produk = require('../../../helpers/databases/mysql/model/Produk');
const connSequelize = require('../../../helpers/databases/mysql/connection');
const sequelize = require('sequelize');
const Op = sequelize.Op;

const findAll = async (payload) => {
  const ctx = 'findAll';
    try {
      let order = [[payload.sortBy,payload.order]];
      if(payload.sortBy != 'createdAt') {
        order = [[sequelize.fn('lower', sequelize.col(`tbl_product.${payload.sortBy}`)),payload.order]];
      }
      let query = {
        where: {
          [Op.or]: [{
            intQty: {
              [Op.gt]: 0
            },
          }]
        },
        offset: (payload.page - 1) * payload.limit,
        limit: payload.limit,
        order: order,
      }
      if(payload.search) {
        query.where = {
          [Op.or]: [{
            txtProductName: {
              [Op.like]: `%${payload.search}%`
            },
          },{
            txtProductCode: {
              [Op.like]: `%${payload.search}%`
            },
          }]
        };
      }

      const result = await Produk.findAndCountAll(query);
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
      const result = await Produk.findOne({
        where: {
          intProductID: payload.id
        },
      });
      if(validate.isEmpty(result)) {
        console.log(ctx, result, 'isEmpty');
        return {
          err: { message: 'Produk not found!', code: 404 },
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
      await Produk.create(payload);
      const result = await Produk.findOne({
        where: {
          intProductID: payload.intProductID
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
      await Produk.update(value, {
        where: {
          intProductID: payload.id
        }
      });
      const result = await Produk.findOne({
        where: {
          intProductID: payload.id
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
      await Produk.destroy({
        where: {
          intProductID: payload.id
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