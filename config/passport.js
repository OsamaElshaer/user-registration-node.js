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
