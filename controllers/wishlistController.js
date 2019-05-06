const db = require("../models");

// Defining methods for the usersController
module.exports = {
  addWishlistItemUser: function (req, res) {
    db.Person
      .findOneAndUpdate({ _id: req.params.userId }, { $push: { wishlist: req.params.itemId } })
      .then(dbModel => {
        console.log("The item is added to the wishlist: " + dbModel);
        res.status(201).json(dbModel);
      })
      .catch(err => {
        console.log(err);
        res.status(422).json(err);
      });
    //.catch(err => res.send(err));
  },

  deleteWishlistItem: function (req, res) {
    db.Person
      .findOneAndUpdate({ _id: req.params.userId }, { $pull: { wishlist: req.params.itemId } })
      .then(dbModel => {
        console.log("The item was deleted from the wishlist of " + dbModel.name);
      })
      .catch(err => {
        console.log(err);
        res.status(422).json(err);
      });
    //.catch(err => res.send(err));
  },

};