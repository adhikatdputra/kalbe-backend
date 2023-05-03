const express = require('express');
let router = express.Router();
const jwtAuth = require('../../helpers/authentication');

const customerHandler = require('../../modules/v1/customer/api_handler');
const productHandler = require('../../modules/v1/product/api_handler');
const salesHandler = require('../../modules/v1/sales/api_handler');

router.get('/customer', customerHandler.getAll);
router.get('/customer/:id', customerHandler.getById);
router.post('/customer', customerHandler.create);
router.put('/customer/:id', customerHandler.update);


router.get('/product', productHandler.getAll);
router.get('/product/:id', productHandler.getById);
router.post('/product', productHandler.create);
router.put('/product/:id', productHandler.update);

router.get('/order', salesHandler.getAll);
router.get('/order/:id', salesHandler.getById);
router.post('/order', salesHandler.create);
router.put('/order/:id', salesHandler.update);

module.exports = router;
