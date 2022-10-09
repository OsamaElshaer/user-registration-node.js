const {User}  = require('../models/User')


exports.logIn = (req, res, next) => {
  res.render("logIn");
};

exports.signUP = (req, res, next) => {
  res.render("signup");
};

exports.postSignUp = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  const user = new User(username,password)
  user.save()
  res.redirect('/')

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
