const router = require("express").Router();
const { registerValidator, loginValidator } = require("../utils/validators");
const authController = require("../controllers/auth.controller");
const authService = require("../services/auth.service");

const { ensureLoggedOut, ensureLoggedIn } = require("connect-ensure-login");

// Register
router.get("/register", ensureLoggedOut({ redirectTo: "/" }), (req, res) => {
  res.render("register");
});
router.post(
  "/register",
  ensureLoggedOut({ redirectTo: "/" }),
  registerValidator,
  authController.register,
  authService.register
);

// Login
router.get("/login", ensureLoggedOut({ redirectTo: "/" }), (req, res, next) => {
  res.render("login");
});

router.post(
  "/login",
  ensureLoggedOut({ redirectTo: "/" }),
  loginValidator,
  authController.login
);

// Logout
router.get("/logout", ensureLoggedIn({ redirectTo: "/" }), (req, res, next) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
