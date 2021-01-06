const messages = require("../constants/messages");
const roles = require("../constants/roles");

// function ensureAuthenticated(req, res, next) {
//   if (req.isAuthenticated()) {
//     next();
//   } else {
//     res.redirect("/auth/login");
//   }
// }

// function ensureLogout(req, res, next) {
//   if (!req.isAuthenticated()) {
//     return next();
//   } else {
//     res.redirect("/");
//   }
// }

function ensureAdmin(req, res, next) {
  if (req.user.role === roles.admin) {
    next();
  } else {
    req.flash("warning", messages.UNAUTHORIZED);
    res.redirect("/");
  }
}

function ensureModerator(req, res, next) {
  if (req.user.role === roles.moderator) {
    next();
  } else {
    req.flash("warning", messages.UNAUTHORIZED);
    res.redirect("/");
  }
}

module.exports = {
  // ensureAuthenticated,
  // ensureLogout,
  ensureModerator,
  ensureAdmin,
};
