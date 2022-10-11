const passport = require("passport");
const { body } = require("express-validator");
const { db } = require("../config/database");
const router = require("express").Router();

const {
  logIn,
  postLogin,
  index,
  logOut,
  signUP,
  postSignUp,
} = require("../controllers/auth");

const { checkAuthenticated, checkLoggedIn } = require("../middleware/isAuth");

router
  .route("/login")
  .get(logIn)
  .post(
    body("username", "username must be less than 8 characters").isLength({
      max: 8,
    }),
    body("password", "password is not valid")
      .isLength({ max: 8 })
      .isAlphanumeric(),
    postLogin,
    checkLoggedIn,
    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/login",
      failureFlash: true,
    })
  );

router
  .route("/signup")
  .get(signUP)
  .post(
    body("username")
      .isLength({ max: 8 })
      .withMessage("username must be more than 8 charchters")
      .custom((value) => {
        return db()
          .collection("users")
          .findOne({ username: value })
          .then((user) => {
            if (user) return Promise.reject("Email Exist");

            // Indicates the success of this synchronous custom validator
            return true;
          });
      }),
    body(
      "password",
      "Pleas Entert the password with only numbers and thext and at least 8 characters"
    )
      .isLength({ max: 8 })
      .isAlphanumeric(),
    postSignUp
  );

router.get("/", checkAuthenticated, index);

router.post("/logout", checkAuthenticated, logOut);

exports.route = router;
