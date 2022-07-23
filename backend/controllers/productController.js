const expressAsyncHandler = require("express-async-handler")

// @desc     get products
// @route    GET /api/products
// @acess    Private
const getProducts = expressAsyncHandler(async (req, res) => {
    res.status(200).json({ message: 'Get Products' })
})

// @desc     create products
// @route    POST /api/products
// @acess    Private
const createProducts = expressAsyncHandler(async (req, res) => {
    if (!req.body.text) {
        res.status(400)
        throw new Error('Please add a text field')
    }

    res.status(200).json({ message: 'Create Products' })
})

// @desc     update products
// @route    PUT /api/products/:id
// @acess    Private
const updateProducts = expressAsyncHandler(async (req, res) => {
    res.status(200).json({ message: `Update Product: ${req.params.id}` })
})

// @desc     delete products
// @route    DELETE /api/products/:id
// @acess    Private
const deleteProducts = expressAsyncHandler(async (req, res) => {
    res.status(200).json({ message: `Delete Product: ${req.params.id}` })
})

module.exports = {
    getProducts,
    createProducts,
    updateProducts,
    deleteProducts
}