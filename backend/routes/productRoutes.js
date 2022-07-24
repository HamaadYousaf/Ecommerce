const express = require('express')
const router = express.Router()
const { getProducts, createProducts, updateProducts, deleteProducts } = require('../controllers/productController')
const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getProducts).post(protect, createProducts)
router.route('/:id').delete(protect, deleteProducts).put(protect, updateProducts)

module.exports = router