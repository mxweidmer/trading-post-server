const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());
app.use(routes);

mongoose.set("debug", true);
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/trading-post");

app.listen(PORT, function () {
    console.log(`API server listening on port ${PORT}`);
});

