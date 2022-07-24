const expressAsyncHandler = require("express-async-handler")
const Product = require('../models/productModel')
const User = require('../models/userModel')

// @desc     get products
// @route    GET /api/products
// @acess    Private
const getProducts = expressAsyncHandler(async (req, res) => {
    const products = await Product.find({ user: req.user.id })

    res.status(200).json(products)
})

// @desc     create products
// @route    POST /api/products
// @acess    Private
const createProducts = expressAsyncHandler(async (req, res) => {
    const { name, desc, price, image } = req.body

    if (!name || !desc || !price || !image) {
        res.status(400)
        throw new Error('Please fill all fields')
    }

    const product = await Product.create({
        name,
        desc,
        price,
        image,
        user: req.user.id
    })
    res.status(200).json(product)
})

// @desc     update products
// @route    PUT /api/products/:id
// @acess    Private
const updateProducts = expressAsyncHandler(async (req, res) => {
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
    if (product.user.toString() !== user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true })

    res.status(200).json(updatedProduct)
})

// @desc     delete products
// @route    DELETE /api/products/:id
// @acess    Private
const deleteProducts = expressAsyncHandler(async (req, res) => {
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
    if (product.user.toString() !== user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    await product.remove()

    res.status(200).json({ id: req.params.id })
})

module.exports = {
    getProducts,
    createProducts,
    updateProducts,
    deleteProducts
}