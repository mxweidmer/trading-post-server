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
        required: "Username is required.",
        unique: true
    },
    email: {
        type: String,
        trim: true,
        match: [/.+@.+\..+/, "Please enter a valid e-mail address"],
        required: "Email cannot be blank",
        unique: false
    },
    phone: {
        type: String,
        trim: true,
        default: ""
    },
    profilePic: {
        type: String,
        trim: true,
        default: "https://via.placeholder.com/150"
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
    password: {
        type: String,
        trim: true,
        required: "Password is required.",
        validate: [
            function (input) {
                return input.length >= 6;
            },
            "Password should be at least 6 characters long."
        ]
    },
    bio: {
        type: String,
        trim: true
    },
    items: [{ type: Schema.Types.ObjectId, ref: 'Item' }],
    wishlist: [{ type: Schema.Types.ObjectId, ref: 'Item' }]
}, { timestamps: true });

var Person = mongoose.model('Person', personSchema);

module.exports = Person;