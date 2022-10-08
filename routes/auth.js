const router = require("express").Router();
const { logIn, index, logOut } = require("../controllers/auth");
const { checkAuthenticated,checkLoggedIn} = require("../middleware/isAuth");
const passport = require("passport");

router.get("/login", logIn);
router.post(
  "/login",
  checkLoggedIn,
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
);
router.get("/", checkAuthenticated, index);

router.post("/logout",checkAuthenticated, logOut);

module.exports = router;
