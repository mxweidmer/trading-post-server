const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 3000;
const userRoutes = require("./routes/users.js");
const categoriesRoutes = require("./routes/categories");
const itemRoutes = require("./routes/items");
const wishlistRoutes = require("./routes/wishlist");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());
//app.use(routes);

/* app.get('/',function(req, res) {
  res.send("Hello from the root route");
}); */

app.use('/api/users', userRoutes);

app.use('/api/categories', categoriesRoutes);

app.use('/api/items', itemRoutes);

app.use('/api/wishlist', wishlistRoutes);

mongoose.set("debug", true);
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/tradingpost", { useNewUrlParser: true });

app.listen(PORT, function () {
  console.log(`API server listening on port ${PORT}`);
});