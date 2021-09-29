const mongoose = require('mongoose');

const AddressSchema = new mongoose.Schema({
    address: { 
        type: String,
        required: true,
    },
    city: { 
        type: String,
        required: true,
    },
    state: { 
        type: String,
        required: true,
    },
    zip: { 
        type: Number,
        required: true,
    }
})

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    address: {
        type: [AddressSchema],
        required: false,
        default: []
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;