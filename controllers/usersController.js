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
  updateUser: function (req, res) {    
       //return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
       let firstNamest = req.body.firstName;
       let lastNamest = req.body.lastName;
       let phonest = req.body.phone;
       let cityst = req.body.city;
       let statest = req.body.state;
   
     
       console.log("id" + req.params.id);     
        db.Person.findOneAndUpdate(           
           { _id: req.params.id },
           { $set: { firstName:  firstNamest, lastName :  lastNamest, phone: phonest, city: cityst, state: statest }} 
        )     
        .then( dbModel => {
                console.log(dbModel);
                res.status(201).json(dbModel)}
            )
        .catch(err => res.status(422).json(err));
     
  },
  getUser: function (req, res) {    
    //return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    console.log(firstName + " " + lastName);
    console.log("id" + req.params.id);     
     db.Person.findOne(           
        { _id: req.params.id },  
     )     
     .then( dbModel => {
             console.log(dbModel);
             res.status(201).json(dbModel)}
         )
     .catch(err => res.status(422).json(err));
  
},
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
