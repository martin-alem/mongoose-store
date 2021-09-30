const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true,
    },
    productPrice: {
        type: mongoose.Decimal128,
        required: true,
    },
    productImage: {
        type: String,
        required: false,
        default: "default.png"
    },
    productQty: {
        type: Number,
        required: true,
    },
    productReview: {
        type: [{ id: String }],
        required: false,
        default: []
    },
    date: {
        type: Date,
        default: Date.now()
    }
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;