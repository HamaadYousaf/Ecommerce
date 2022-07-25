const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const expressAsyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const Product = require('../models/productModel')
const { findById } = require('../models/userModel')

// @desc     register user
// @route    POST /api/users
// @acess    Public
const registerUser = expressAsyncHandler(async (req, res) => {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
        res.status(400)
        throw new Error('Please add all fields')
    }

    const userExists = await User.findOne({ email })

    if (userExists) {
        res.status(400)
        throw new Error('User already exists')
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        cart: []
    })

    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            cart: user.cart,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

// @desc     Authenticate a user
// @route    POST /api/users/login
// @acess    Public
const loginUser = expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            cart: user.cart,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid credentials')
    }
})

// @desc     get user data
// @route    GET /api/users/me
// @acess    Private
const getMe = expressAsyncHandler(async (req, res) => {
    const { _id, name, email, cart } = await User.findById(req.user.id)

    res.status(200).json({
        id: _id,
        name,
        email,
        cart
    })
})

// @desc     add to user cart
// @route    POST /api/users/add/:id
// @acess    Private
const addToCart = expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

    if (!product) {
        res.status(400)
        throw new Error('Product not found')
    }

    const user = await User.findById(req.user.id)

    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }

    const alreadyAdded = user.cart.find(productId => productId == product.id)
    if (!alreadyAdded) {
        await User.updateOne(user, {
            $set:
            {
                cart: [...user.cart, product]
            }
        })
    }

    const updatedUser = await User.findById(req.user.id)
    res.status(200).json(updatedUser)
})

// @desc     remove from user cart
// @route    POST /api/users/remove/:id
// @acess    Private
const removeFromCart = expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

    if (!product) {
        res.status(400)
        throw new Error('Product not found')
    }

    const user = await User.findById(req.user.id)

    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }

    const newCart = user.cart.filter(productId => productId != product.id)

    await User.updateOne(user, {
        $set:
        {
            cart: newCart
        }
    })

    const updatedUser = await User.findById(req.user.id)
    res.status(200).json(updatedUser)
})

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

module.exports = {
    registerUser,
    loginUser,
    getMe,
    addToCart,
    removeFromCart
}