const express = require("express");
const router = express.Router();
const passport = require("passport");
const db = require("../models");


// Route to check if user is signed in (using session)
// =========================================================

router.get("/user", (req, res) => {
   console.log(req.user, 'req.user');
   console.log('isAuthenticated', req.isAuthenticated());

   if (req.isAuthenticated()) {
      const currentUser = req.session.passport.user;
      console.log("Current user: ", currentUser);
      db.Person.findOne({ _id: currentUser })
         .then(dbUser => {
            const user = {
               loggedIn: true,
               userName: dbUser.userName
            }
            console.log("Logged in user: ", user)
            res.json(user);
         })

   } else {
      const noUser = {
         loggedIn: false,
         userName: ""
      }
      console.log(noUser)
      res.json(noUser);
   }
});


// Route to authenticate user sign up
// =========================================================

router.post("/signup", (req, res, next) => {

   passport.authenticate("local-signup", (err, user) => {
      if (err) {
         console.log("Error: ", err);
         return next(err);
      }

      if (!user) {
         console.log("Not a user.")
         return res.send("Please re-enter your username and password.");
      }

      req.login(user, err => {
         if (err) {
            console.log("auth error")
            return next(err);
         }

         res.cookie("userName", req.user.userName);
         res.cookie("user_id", user._id);
         console.log(req.session.passport, 'req.session.passport');
         console.log(req.session.passport.user, 'req.session.passport.user');
         res.json({message: "Success!", user});
      });

   })(req, res, next);
});


// Route to authenticate user login
// =========================================================

router.post("/login", (req, res, next) => {

   passport.authenticate("local-login", (err, user) => {
      if (err) {
         console.log("Error: ", err);
         return next(err);
      }

      if (!user) {
         console.log("Not a user.");
         return res.send("Please re-enter your username and password.");
      }

      req.login(user, (err) => {
         
         if (err) {
            console.log("auth error");
            return next(err);
         }

         res.cookie("userName", user.userName);
         res.cookie("user_id", user._id);
         var userI = { userName: user.userName, user_id: user._id }
         return res.json(userI);
      })

   })(req, res, next);
});


// Route to handle logout
// =========================================================

router.get("/logout", function (req, res) {

   req.session.destroy(function (err) {
     if (err) {
       console.log("Error: ", err);
     }
     res.clearCookie("userName");
     res.clearCookie("connect.sid");
     //res.redirect("/");
     res.json({message: "Success!"});
   });

 });

module.exports = router;