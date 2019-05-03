const express = require("express");
const router = express.Router();
const passport = require("passport");
const db = require("../models");


// Route to check if user is signed in (using session)
// =========================================================

router.get("/user", (req, res) => {

   if (req.isAuthenticated()) {
      const currentUser = req.session.passport.user;
      console.log("Current user: ", currentUser);
      db.User.findOne({ _id: currentUser })
         .then(dbUser => {
            const user = {
               loggedIn: true,
               username: dbUser.username
            }
            console.log("Logged in user: ", user)
            res.json(user);
         })

   } else {
      const noUser = {
         loggedIn: false,
         username: ""
      }
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

         res.cookie("username", req.user.username);
        // res.cookie("user_id", req.user.id);
         return res.redirect("/");
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

         res.cookie("username", user.username);
         //res.cookie("user_id", user._id);
         var userI = { username: user.username }
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
     res.clearCookie("user_id");
     res.clearCookie("username");
     res.clearCookie("connect.sid");
     res.redirect("/");
   });

 });

module.exports = router;