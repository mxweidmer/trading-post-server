const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const flash = require('express-flash-messages');
const session = require("express-session");
const passport = require('passport');

const app = express();
const PORT = process.env.PORT || 8080;
const userRoutes = require("./routes/users.js");
const categoriesRoutes = require("./routes/categories");
const itemRoutes = require("./routes/items");
const wishlistRoutes = require("./routes/wishlist");
const authRoutes = require("./routes/auth");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.use(cors());
//app.use(routes);

/* app.get('/',function(req, res) {
  res.send("Hello from the root route");
}); */

// Configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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
  resave: true,
  saveUninitialized: true,
  cookie: {
    path: '/',
    expires: 2592000000,
    httpOnly: false,
    encode:String,
  }
}));

// Initialize passport authentication 
app.use(passport.initialize());

// Persistent login sessions. Session expires after 6 months or when deleted by user.
app.use(passport.session());

// enable CORS so that browsers don't block requests.
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://mxweidmer.github.io/');
  res.header('Access-Control-Allow-Credentials', true),
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

app.use('/api/users', userRoutes);

app.use('/api/categories', categoriesRoutes);

app.use('/api/items', itemRoutes);

app.use('/api/wishlist', wishlistRoutes);

app.use('/api/auth', authRoutes);



app.listen(PORT, function () {
  console.log(`API server listening on port ${PORT}`);
});