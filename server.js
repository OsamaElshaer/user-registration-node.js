//Import Express
const express = require("express");
const app = express();

const methodOverride = require("method-override");

//Import the main Passport and Express-Session library
const passport = require("passport");
const session = require("express-session");

//Import the secondary "Strategy" library
const LocalStrategy = require("passport-local").Strategy;

//tempalte engine
app.set("view engine", "ejs");


//config passport
// The "authUser" is a function that we will define later will contain the steps to authenticate a user, and will return the "authenticated user".
const {authUser} = require('./config/passport')
passport.use(new LocalStrategy (authUser))

passport.serializeUser((user, done) => {
  console.log(`--------> Serialize User`);
  console.log(user);

  done(null, user.id);

  // Passport will pass the authenticated_user to serializeUser as "user"
  // This is the USER object from the done() in auth function
  // Now attach using done (null, user.id) tie this user to the req.session.passport.user = {id: user.id},
  // so that it is tied to the session object
});

passport.deserializeUser((id, done) => {
  console.log("---------> Deserialize Id");
  console.log(id);

  done(null, findBy('id',id));

  // This is the id that is saved in req.session.passport.{ user: "id"} during the serialization
  // use the id to find the user in the DB and get the user object with user details
  // pass the USER object in the done() of the de-serializer
  // this USER object is attached to the "req.user", and can be used anywhere in the App.
}); 


//routes
const authRouter = require("./routes/auth");
const { findBy } = require("./models/auth");

//middleware
app.use(express.urlencoded({ extended: true }));

// This is the basic express session({..}) initialization.
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
);

// init passport on every route call.
app.use(passport.initialize());

// allow passport to use "express-session".
app.use(passport.session());

app.use("/", authRouter);

app.listen(3000);
