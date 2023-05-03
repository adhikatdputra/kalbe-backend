const Sequelize = require('sequelize');
const Model = Sequelize.Model;
const sequelize = require('../connection');

class Penjualan extends Model {}
Penjualan.init(
  {
    intSalesOrderID: {
      type: Sequelize.STRING(64),
      allowNull: false,
      primaryKey: true
    },
    intCustomerID: {
      type: Sequelize.STRING(64),
      allowNull: false,
    },
    intProductID: {
      type: Sequelize.STRING(64),
      allowNull: false,
    },
    intQty: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: true,
    modelName: 'tbl_order'
  }
);

module.exports = Penjualan;
