const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const personSchema = Schema({
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    city: String,
    state: String,
    password: String,
    rating: Number,
    items: [{ type: Schema.Types.ObjectId, ref: 'Item' }],
    wishlist: [{ type: Schema.Types.ObjectId, ref: 'Item' }]
});

var Person = mongoose.model('Person', personSchema);

module.exports = Person;