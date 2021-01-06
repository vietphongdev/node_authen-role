const User = require("../models/user.model");
const messages = require("../constants/messages");

const register = async (req, res, next) => {
  try {
    const { email } = req.body;
    const isExist = await User.findOne({ email });
    if (isExist) {
      req.flash("warning", "");
      res.redirect("/auth/register");
      return;
    }
    const user = new User(req.body);
    await user.save();
    req.flash("success", messages.REGISTER_SUCCESSFULLY);
    res.redirect("/auth/login");
  } catch (error) {
    next(error);
  }
};

module.exports = { register };
