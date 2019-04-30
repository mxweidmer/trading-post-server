const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const personSchema = Schema({
    firstName: {
        type: String,
        trim: true
    },
    lastName: {
        type: String,
        trim: true
    },
    email: {type: String,
        match: [/.+@.+\..+/, "Please enter a valid e-mail address"],
        required: "Email cannot be blank"
    },
    phone: {
        type: String,
        trim: true
    },
    city: {
        type: String,
        trim: true
    },
    state: {
        type: String,
        trim: true
    },
    awsid: {
        type: String
    },
    password: String,
    rating: Number,
    items: [{ type: Schema.Types.ObjectId, ref: 'Item' }]
    /* ,wishlist: [{ type: Schema.Types.ObjectId, ref: 'Item' }] */
});

var Person = mongoose.model('Person', personSchema);

module.exports = Person;