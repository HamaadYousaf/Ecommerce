const express = require('express')
const router = express.Router()
const { registerUser, loginUser, getMe, addToCart, removeFromCart } = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')

router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/me', protect, getMe)
router.post('/add/:id', protect, addToCart)
router.post('/remove/:id', protect, removeFromCart)

module.exports = router
