const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    desc: {
        type: String,
        required: [true, 'Please add a description']
    },
    price: {
        type: String,
        required: [true, 'Please add a price']
    },
    image: {
        type: String,
        required: [true, 'Please add a imageURL']
    }
})

module.exports = mongoose.model('Product', productSchema)