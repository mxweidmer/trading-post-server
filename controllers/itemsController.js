const db = require("../models");
const axios = require("axios");

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
            .limit(12)
            .sort({ createdAt: sort })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    //the method to add an item
    addItem: function (req, res) {

        axios.post("https://api.imgur.com/3/upload", {
            datatype: "multipart/form-data",
            headers: {
                "Authorization": "Client-ID 8bc6ab7f6927702"
            },
            data: req.body.picture,
            cache: false,
            contentType: false,
            processData: false
        }).then(imgur => {

            db.Item
                .create({
                    _owner: req.body._owner,
                    title: req.body.title,
                    picture: imgur.data.link,
                    description: req.body.description,
                    category: req.body.category,
                    condition: req.body.condition
                })
                .then(dbModel => {
                    db.Person.findOneAndUpdate({ _id: req.params.userId }, { $push: { items: dbModel._id } }).then(dbModel => console.log(dbModel));

                    res.status(201).json(dbModel);
                })
                .catch(err => {
                    console.log(err);
                    res.status(422).json(err);
                });
        }).catch(error => {
            console.log(error);
        })


    },
    deleteItem: function (req, res) {
        db.Person
            .findOneAndUpdate({ _id: req.params.userId }, { $pull: { items: req.params.itemId } })
            .then(dbModel => {
                console.log("The item was deleted from the wishlist of " + dbModel.name);
            })
            .catch(err => {
                console.log(err);
                res.status(422).json(err);
            });

        db.Item.remove({ _id: req.params.itemId }).then(() => console.log("Item deleted"))
    },
    updateItem: function (req, res) {
        db.Item.findOneAndUpdate({ _id: req.params.itemId }, { $set: req.body }).then(() => console.log("yay"))
    },
    getSingleItem: function (req, res) {
        db.Item.findById({ _id: req.params.itemId }).then(dbModel => res.json(dbModel))
    }
};
