const db = require("../models");

// Defining methods for the booksController
module.exports = {
    //get method to retrieve all categories for drop down menu on search page
    getCategories: function (req, res) {
        db.Category
            .find({})
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    //the method to get all items in a category
    getCategory: function (req, res) {
        db.Category
            .find({ name: req.params.category })
            .populate('items')
            .then(dbModel => {
                console.log(dbModel);
                res.status(201).json(dbModel);
            })
            .catch(err => {
                console.log(err);
                res.status(422).json(err);
            });
    },
    addCategory: function (req, res) {
        db.Category
            .create({ name: "Books" })
            .then(dbModel => {
                console.log(dbModel);
                res.status(201).json(dbModel);
            })
            .catch(err => {
                console.log(err);
                res.status(422).json(err);
            });
    }
};
