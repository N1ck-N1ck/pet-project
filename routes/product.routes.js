const Router = require('express')
const router = new Router()
const productController = require('../controller/product.controller');

router.get('/product/:id', productController.getProduct);

module.exports = router;