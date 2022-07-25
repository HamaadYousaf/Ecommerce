const expressAsyncHandler = require("express-async-handler")
const Product = require('../models/productModel')

// @desc     get products
// @route    GET /api/products
// @acess    Public
const getAllProducts = expressAsyncHandler(async (req, res) => {
    const products = await Product.find()
    res.status(200).json(products)
})

// @desc     get products
// @route    GET /api/products/:id
// @acess    Public
const getProduct = expressAsyncHandler(async (req, res) => {
    const products = await Product.findById(req.params.id)
    res.status(200).json(products)
})

// @desc     create products
// @route    POST /api/products
// @acess    Public
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
    })
    res.status(200).json(product)
})

// @desc     update products
// @route    PUT /api/products/:id
// @acess    Public
const updateProducts = expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

    if (!product) {
        res.status(400)
        throw new Error('Product not found')
    }

    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true })

    res.status(200).json(updatedProduct)
})

// @desc     delete products
// @route    DELETE /api/products/:id
// @acess    Public
const deleteProducts = expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

    if (!product) {
        res.status(400)
        throw new Error('Product not found')
    }

    await product.remove()

    res.status(200).json({ id: req.params.id })
})

module.exports = {
    getAllProducts,
    getProduct,
    createProducts,
    updateProducts,
    deleteProducts
}