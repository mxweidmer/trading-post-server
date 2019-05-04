const passport = require("passport");
const LocalStrategy = require("passport-local");
const db = require("../models");
const bCrypt = require("bcrypt-nodejs");


module.exports = () => {
   // Passport session setup
   // ========================================

   passport.serializeUser((user, cb) => {
      cb(null, user.id);
   });

   passport.deserializeUser((id, cb) => {

      db.Person.findById(id, (err, user) => {
         if (err) { return cb(err); }
         cb(null, user);
      });

   });


   // Sign up configuration
   // ========================================

   passport.use("local-signup", new LocalStrategy({
      usernameField: 'userName',
      passwordField: 'password',
      passReqToCallback: true
   },
      (req, userName, password, done) => {
console.log("usernam: "+ userName)
         db.Person.findOne({ userName: userName }, (err, user) => {
            if (err) {
               console.log("Error: ", err);
               return done(err);
            }

            if (user !== null) {
               console.log("Username is already taken.", user);
               return done(null, false, { message: "Username is already taken." });
            }

            const hashedPassword = generateHash(req.body.password);
            const newUser = {
               firstName: req.body.firstName,
               lastName: req.body.firstName,
               userName: req.body.userName,
               password: hashedPassword,
               email: req.body.email,
               phone: req.body.phone,
               city: req.body.city,
               state: req.body.state,
               
            }
            db.Person.create(newUser)
               .then(function (dbUser) {
                  if (!dbUser) {
                     return done(null, false);
                  } else {
                     return done(null, dbUser);
                  }
               })

         });
      }
   ));


   // Log in configuration
   // ========================================

   passport.use("local-login", new LocalStrategy({
      usernameField: 'userName',
      passwordField: 'password',
      passReqToCallback: true
   },
      (req, userName, password, done) => {

         db.Person.findOne({ userName: userName }, (err, user) => {   
            if (err) {
               console.log("Error: ", err);
               return done(err);
            }
            
            if (!user) {
               console.log("No user found.", user);
               return done(null, false, {
                  message: "No user found."
               });
            }

            if (!bCrypt.compareSync(password, user.password)) {
               console.log("Invalid password.");
               return done(null, false, {
                  message: "Invalid password."
               });
            }

            console.log("Success!", user);
            return done(null, user);
         });
      }
   ));
}

// Generate hash for password
function generateHash(password) {
   return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
};