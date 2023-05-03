const Sequelize = require('sequelize');
const Model = Sequelize.Model;
const sequelize = require('../connection');
const Order = require('./Penjualan');

class Customer extends Model {}
Customer.init(
  {
    intCustomerID: {
      type: Sequelize.STRING(64),
      allowNull: false,
      primaryKey: true
    },
    txtCustomerName: {
      type: Sequelize.STRING(255)
    },
    txtCustomerAddress: {
      type: Sequelize.STRING(255)
    },
    bitGender: {
      type: Sequelize.INTEGER
    },
    dtmBirthDate: {
      type: Sequelize.DATE,
    },
  },
  {
    sequelize,
    timestamps: true,
    modelName: 'tbl_customer'
  }
);

Customer.hasMany(Order, {
  as: 'order',
  foreignKey: 'intCustomerID',
  onDelete: 'CASCADE'
});
Order.belongsTo(Customer, {as: 'customer', foreignKey: 'intCustomerID'})

module.exports = Customer;
