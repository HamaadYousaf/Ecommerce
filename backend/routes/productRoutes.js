const express = require('express')
const router = express.Router()
const { getAllProducts, getProduct, createProducts, updateProducts, deleteProducts } = require('../controllers/productController')

router.route('/').get(getAllProducts).post(createProducts)
router.route('/:id').delete(deleteProducts).put(updateProducts).get(getProduct)

module.exports = router