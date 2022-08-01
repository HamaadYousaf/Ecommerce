const express = require('express')
const router = express.Router()
const { registerUser, loginUser, getMe, addToCart, removeFromCart, showCart } = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')

router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/me', protect, getMe)
router.get('/cart', protect, showCart)
router.post('/add/:id', protect, addToCart)
router.post('/remove/:id', protect, removeFromCart)

module.exports = router
