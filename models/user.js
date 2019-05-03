var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  username: {
    type: String,
    trim: true,
    required: "Username is required.",
    unique: true
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
  email: {
    type: String,
    trim: true,
    required: "Email is required.",
    unique: false
  },
  userCreated: {
    type: Date,
    default: Date.now
  }
});

var User = mongoose.model("User", UserSchema);

module.exports = User;