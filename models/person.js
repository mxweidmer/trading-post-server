const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const personSchema = Schema({
    firstName: {
        type: String,
        trim: true,
        required: true
    },
    lastName: {
        type: String,
        trim: true,
        required: true
    },
    userName: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        match: [/.+@.+\..+/, "Please enter a valid e-mail address"],
        required: "Email cannot be blank"
    },
    phone: {
        type: String,
        trim: true,
        default: ""
    },
    city: {
        type: String,
        trim: true,
        required: true
    },
    state: {
        type: String,
        trim: true,
        required: true
    },
    awsid: {
        type: String
    },
    password: String,
    rating: {
        default: 0
    },
    items: [{ type: Schema.Types.ObjectId, ref: 'Item' }],
    wishlist: [{ type: Schema.Types.ObjectId, ref: 'Item' }]
}, { timestamps: true });

var Person = mongoose.model('Person', personSchema);

module.exports = Person;