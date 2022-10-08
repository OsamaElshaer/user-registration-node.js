exports.logIn = (req, res, next) => {
  res.render("logIn");
};

exports.index = (req, res, next) => {
  console.log(req.user)
  res.render("index",{
    name:req.user.username
  });
};

exports.logOut = (req, res,next) => {
  req.logout((err)=> {
    if (err) {
      return next(err);
    }
    res.redirect("/login");
  } 
)};


