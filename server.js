const flash = require("express-flash");
//Import Express
const express = require("express");
const app = express();
const { User } = require("./models/User");
//db connetion
let { dbConnection } = require("./config/database");

//dotenv
require("dotenv").config();

//Import the main Passport and Express-Session library
const passport = require("passport");

//Import the secondary "Strategy" library
const LocalStrategy = require("passport-local").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;

//session
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

//tempalte engine
app.set("view engine", "ejs");

// require methods
const authRouter = require("./routes/auth").route;

//config passport

// The "authUser" is a function that we will define later will contain the steps to authenticate a user, and will return the "authenticated user".
const {
  authUser,
  verifyCallback,
  strategyOptions,
} = require("./config/passport");
passport.use(new LocalStrategy(authUser));
// passport.use(new FacebookStrategy(strategyOptions,verifyCallback))

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(flash());
let store = new MongoDBStore({
  uri: "mongodb://localhost:27017/userManagment",
  collection: "session",
});

// This is the basic express session({..}) initialization.
app.use(
  session({
    secret: "my secret",
    store: store,
    resave: false, //if true, will not save session on every req sent and it will save it if there are modifid
    saveUninitialized: true, //if false, will not save uninitialized session (when it is new but not modified.) useful for implementing login sessions, if logedIn:true not modifie on session it will not save it.
    cookie: {
      secure: false, //will not send cookie if browser dose not have https connection
      httpOnly: false, // if true, will disallow client side javascript from reading cookie in document.cookie
      expires: new Date(Date.now() + 60 * 60 * 1000), //1h
    },
  })
);
// This is the basic express session({..}) initialization.
app.use(passport.initialize());
// init passport on every route call.
app.use(passport.session());
// allow passport to use "express-session".

//routes
app.use("/", authRouter);

dbConnection((database) => {
  // if (database) console.log("connected to database");
  app.listen(3000);
});
