const { validationResult } = require("express-validator");
const passport = require("passport");

const register = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      errors.array().forEach((error) => {
        req.flash("error", error.msg);
      });
      res.render("register", {
        email: req.body.email,
        messages: req.flash(),
      });
      return;
    }
    passport.authenticate("local", {
      // successRedirect: '/',
      successReturnToOrRedirect: "/",
      failureRedirect: "/auth/login",
      failureFlash: true,
    });
  } catch (err) {
    console.error(err);
    res.status(401).json(err);
  }
};

const login = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      errors.array().forEach((error) => {
        req.flash("error", error.msg);
      });
      res.render("login", {
        email: req.body.email,
        messages: req.flash(),
      });
      return;
    }
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json(err);
  }
};

module.exports = {
  register,
  login,
};
