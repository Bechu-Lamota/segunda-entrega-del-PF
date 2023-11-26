const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    id: String,
    title: {
        type: String,
        unique: true
    },
    price: Number,
    code: String,
    stock: Number
})

module.exports = mongoose.model('products', productSchema)