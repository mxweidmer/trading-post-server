const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const flash = require('express-flash-messages');
const session = require("express-session");
const passport = require('passport');

const app = express();
const PORT = process.env.PORT || 3000;
const userRoutes = require("./routes/users.js");
const categoriesRoutes = require("./routes/categories");
const itemRoutes = require("./routes/items");
const wishlistRoutes = require("./routes/wishlist");
const authRoutes = require("./routes/auth");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());
//app.use(routes);

/* app.get('/',function(req, res) {
  res.send("Hello from the root route");
}); */

// Connect to Mongoose
mongoose.Promise = Promise;
mongoose.set("debug", true);
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/tradingpost", { useNewUrlParser: true });

// Cookie parser
app.use(cookieParser());
app.use(flash());
require('./config/passport')(passport);

// Express session
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: 2592000000,
    httpOnly: false
  }
}));

// Initialize passport authentication 
app.use(passport.initialize());

// Persistent login sessions. Session expires after 6 months or when deleted by user.
app.use(passport.session());

app.use('/api/users', userRoutes);

app.use('/api/categories', categoriesRoutes);

app.use('/api/items', itemRoutes);

app.use('/api/wishlist', wishlistRoutes);

app.use('/api/auth', authRoutes);



app.listen(PORT, function () {
  console.log(`API server listening on port ${PORT}`);
});