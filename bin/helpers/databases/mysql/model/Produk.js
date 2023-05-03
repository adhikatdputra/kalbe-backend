const Sequelize = require('sequelize');
const Model = Sequelize.Model;
const sequelize = require('../connection');
const Order = require('./Penjualan');

class Produk extends Model {}
Produk.init(
  {
    intProductID: {
      type: Sequelize.STRING(64),
      allowNull: false,
      primaryKey: true
    },
    txtProductCode: {
      type: Sequelize.STRING(255)
    },
    txtProductName: {
      type: Sequelize.STRING(255)
    },
    intQty: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    decPrice: {
      type: Sequelize.DOUBLE,
    },
  },
  {
    sequelize,
    timestamps: true,
    modelName: 'tbl_product'
  }
);

Produk.hasMany(Order, {
  as: 'order',
  foreignKey: 'intProductID',
  onDelete: 'CASCADE'
});
Order.belongsTo(Produk, {as: 'product', foreignKey: 'intProductID'})

module.exports = Produk;
