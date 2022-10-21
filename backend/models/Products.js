const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    user: {
        ref: 'users',
        type: Schema.Types.ObjectId
    },
    store: {
        type: String,
        required: true
    },
    productName: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    creationData: {
        type: String,
        required: true
    },
    weight: {
        type: String,
        required: true
    },
    remains: {
        type: Number,
        required: true
    },
    day: {
        type: String,
        default: ''
    },
    lastSale: {
        type: String,
        default: ''
    },
    quantity: {
        type: Number,
        default: ''
    },
    delete: {
        type: Boolean,
        default: false
    },
});

module.exports = mongoose.model('products', productSchema);