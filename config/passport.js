const { User } = require("../models/User");

exports.authUser = (username, password, done) => {
  const user = User.findByName(username, (user) => {
    if (!user) {
      return done(null, false, { message: "user not found" });
    }
    if (user.password !== password) {
      return done(null, false, { message: "wrong password" });
    }
    return done(null, user);
  });
};

exports.strategyOptions = {
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: `${process.env.SERVER_API_URL}/index`,
};

exports.verifyCallback = (accessToken, refreshToken, profile, cb) => {
  User.findOrCreate({ facebookId: profile.id }, function (err, user) {
    return cb(err, user);
  });
};

