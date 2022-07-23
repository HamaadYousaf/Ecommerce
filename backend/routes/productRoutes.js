const express = require('express')
const router = express.Router()
const { getProducts, createProducts, updateProducts, deleteProducts } = require('../controllers/productController')

router.route('/').get(getProducts).post(createProducts)
router.route('/:id').delete(deleteProducts).put(updateProducts)

module.exports = router