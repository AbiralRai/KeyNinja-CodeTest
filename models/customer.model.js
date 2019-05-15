const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');
const validate = require('mongoose-validator');

const emailValidator = [
    validate({
        validator: 'isLength',
        arguments: [0, 40],
        message: 'Email must not exceed {ARGS[1]} characters.'
    }),
    validate({
        validator: 'isEmail',
        message: 'Email must be valid.'
    })
];
// Create Customer Schema & Model
const CustomerSchema = new Schema({
    firstname: {
        type: String,
        required: [true, 'First name is required']
    },
    lastname: {
        type: String
    },
    email: {
        type: String,
        required: [true, 'Email is required.'],
        unique: true,
        validate: emailValidator
    }
})
CustomerSchema.plugin(uniqueValidator, {message: "{PATH} already taken"});

const Customer = mongoose.model('customer', CustomerSchema);

module.exports = Customer;