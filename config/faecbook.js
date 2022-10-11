const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
const { User } = require("../models/User");
const { db } = require("./database");

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: `${process.env.SERVER_API_URL}/index`,
    },
    (accessToken, refreshToken, profile, done) => {
      // check first if user already exists in our DB.
      db()
        .collection("users")
        .findOne({ facebookId: profile.id })
        .then((currentUser) => {
          if (currentUser) {
            done(null, currentUser);
          } else {
            const user = new User({
              username: profile._json.name,
              facebookId: profile.id,
            });
            user.save().then(() => console.log("user saved to DB."));
            done(null, user);
          }
        });
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});
