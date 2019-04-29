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
  //the method to adda new user to Persons document
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
  /* getUser: function (req, res) {
    db.Person
      .find(req.body)
      .then(dbModel => res.status(201).json(dbModel))
      .catch(err => res.status(422).json(err));
      //.catch(err => res.send(err));
  },
 */
  /* saveBook: function (req, res) {
    db.Book
      .create(req.body)
      .then(dbModel => res.status(201).json(dbModel))
      .catch(err => res.status(422).json(err));
      //.catch(err => res.send(err));
  },
  remove: function (req, res) {
    db.Book.remove({_id: req.params.id })
      //.findById({ _id: req.params.id })
      //.then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  } */
};
