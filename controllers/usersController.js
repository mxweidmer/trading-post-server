const db = require("../models");

// Defining methods for the booksController
module.exports = {
  //get method to retrieve all users - for testing only, remove before deploying
  findUsers: function (req, res) {
    db.Person
      .find({})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  //the method to add a new user to Persons document
  addUser: function (req, res) {
    db.Person
      .create(req.body)
      .then(dbModel => {
        console.log(dbModel);
        res.status(201).json(dbModel);
      })
      .catch(err => {
        console.log(err);
        res.status(422).json(err);
      });
    //.catch(err => res.send(err));
  },
  updateUser: function (req, res) {
    //return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });

    db.Person.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body }
    )
      .then(dbModel => {
        console.log(dbModel);
        res.status(201).json(dbModel)
      }
      )
      .catch(err => res.status(422).json(err));
  },
  getUser: function (req, res) {
    //return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });

    db.Person.findOne({ _id: req.params.id })
      .populate('items')
      .then(dbModel => {
        console.log(dbModel);
        res.status(201).json(dbModel)
      }
      )
      .catch(err => res.status(422).json(err));
  }
};
