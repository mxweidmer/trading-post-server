const passport = require("passport");
const LocalStrategy = require("passport-local");
const db = require("../models");
const bCrypt = require("bcrypt-nodejs");


module.exports = () => {
   // Passport session setup
   // ========================================

   passport.serializeUser((user, cb) => {
      console.log('serializeUser!!!!!!!!!!!! ------------------------\n\n\n')
      console.log({user})
      cb(null, user.id);
   });

   passport.deserializeUser((id, cb) => {
      console.log('deserializeUser!!!!!!!!!!!! ------------------------\n\n\n')
      console.log({id})
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
         // find username from models 
         db.Person.findOne({ userName: userName }, (err, user) => {
            if (err) {
               console.log("Error: ", err);
               return done(err);
            }

            // checking user exist or not
            if (user !== null) {
               console.log("Username is already taken.", user);
               return done(null, false, { message: "Username is already taken." });
            }

            // genrate hash password
            const hashedPassword = generateHash(req.body.password);

            // New user information from client side            
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

            // creating new user from client data, if successfull than return new user to (passpor.authentication)
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
           // Checking user exist or not 
            if (!user) {
               console.log("No user found.", user);
               return done(null, false, {
                  message: "No user found."
               });
            }
            // Comparing bcrypt password with save password(Database) 
            if (!bCrypt.compareSync(password, user.password)) {
               console.log("Invalid password.");
               return done(null, false, {
                  message: "Invalid password."
               });
            }

            // if successfull than user return to (req.login:auth.js) 
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