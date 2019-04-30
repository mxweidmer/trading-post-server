const db = require("../models");

// Defining methods for the usersController
module.exports = {

  //get method to retrieve all wishlist items for one users
  findWishlistItems: function (req, res) {
    db.Wishlist
      .find({_user: req.params.id })
      .then(dbModel => {
          console.log("The items are in the user's wishlist: " + dbModel);
          res.json(dbModel)})
      .catch(err => res.status(422).json(err));
  },

  //the method to add a new wishlist Item for a user where user id is a parameter, and the item id is passed in the req.body
  addWishlistItem: function (req, res) {
    db.Wishlist
      .create({ _user: req.params.id }, { _item: req.body })
      .then(dbModel => {
        console.log("The item is added to the wishlist: " + dbModel);
        res.status(201).json(dbModel);
      })
      .catch(err => {
        console.log(err);
        res.status(422).json(err);
      });
    //.catch(err => res.send(err));
  }

};