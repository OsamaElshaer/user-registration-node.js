const router = require("express").Router();
const { logIn, index, logOut, signUP, postSignUp } = require("../controllers/auth");
const { checkAuthenticated, checkLoggedIn } = require("../middleware/isAuth");
const passport = require("passport");

router
  .route("/login")
  .get(logIn)
  .post(
    checkLoggedIn,
    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/login",
    })
  );

router.route("/signup").get(signUP).post(postSignUp);

router.get("/", checkAuthenticated, index);

router.post("/logout", checkAuthenticated, logOut);

module.exports = router;
