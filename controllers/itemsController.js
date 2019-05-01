const db = require("../models");

// Defining methods for the itemsController
module.exports = {
    //get method to retrieve all items and sort them
    getAllItems: function (req, res) {
        var sort;
        if (req.params.sortMethod === "dateDown") {
            sort = -1;
        } else if (req.params.sortMethod === "dateUp") {
            sort = 1;
        }
        db.Item
            .find({})
            .sort({ createdAt: sort })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    //the method to add an item
    addItem: function (req, res) {
        db.Item
            .create(req.body)
            .then(dbModel => {
                db.Person.findOneAndUpdate({ _id: req.params.userId }, { $push: { items: dbModel._id } }).then(dbModel => console.log(dbModel));

                res.status(201).json(dbModel);
            })
            .catch(err => {
                console.log(err);
                res.status(422).json(err);
            });
    },
    deleteItem: function (req, res) {
        db.Item.remove({ _id: req.params.itemId }).then(() => console.log("Item deleted"))
    },
    updateItem: function (req, res) {
        db.Item.findOneAndUpdate({ _id: req.params.itemId }, { $set: req.body }).then(() => console.log("yay"))
    },
    getSingleItem: function (req, res) {
        db.Item.findById({ _id: req.params.id }).then(() => console.log("maybe"))
    }
};
