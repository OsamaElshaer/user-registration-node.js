const { User } = require("../models/User");
const { validationResult } = require("express-validator");

exports.logIn = (req, res, next) => {
  res.render("logIn", {
    error: null,
  });
};

exports.postLogin = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render("login", {
      error: errors.array()[0].msg,
    });
  }
  next()
};

exports.signUP = (req, res, next) => {
  res.render("signup",{
    error:null
  });
};

exports.postSignUp = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render("login", {
      error: errors.array()[0].msg,
    });
  }

  const user = new User(username, password);
  user.save();
  res.redirect("/");
};

exports.index = (req, res, next) => {
  res.render("index", {
    name: req.user.username,
  });
};

exports.logOut = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/login");
  });
};
