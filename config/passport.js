// The “done()” function is then used to pass the “{authenticated_user}” to the serializeUser() function.

// Note, the done(<err>, <user>) function in the “authUser” is passed as ,

// 1. If the user not found in DB,
// done (null, false)

// 2. If the user found in DB, but password does not match,
// done (null, false)

// 3. If user found in DB and password match,
// done (null, {authenticated_user})

const { findBy } = require("../models/auth");

exports.authUser = (username, password, done) => {
  const user = findBy("username", username);

  if (!user) return done(null, false, { message: "user not found" });
  if (user.password !== password)
    return done(null, false, { message: "wrong password" });

  return done(null, user);
};
