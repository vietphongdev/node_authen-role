const { body } = require("express-validator");
const messages = require("../constants/messages");

module.exports = {
  registerValidator: [
    body("email")
      .trim()
      .isEmail()
      .withMessage(messages.EMAIL_INVALID)
      .normalizeEmail()
      .toLowerCase(),
    body("password")
      .trim()
      .isLength(2)
      .withMessage(messages.PASSWORD_LENGTH_SHORT),
    body("password2").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error(messages.PASSWORD_NOT_MATCH);
      }
      return true;
    }),
  ],
  loginValidator: [
    body("email")
      .trim()
      .isEmail()
      .withMessage(messages.EMAIL_INVALID)
      .normalizeEmail()
      .toLowerCase(),
    body("password")
      .trim()
      .isLength(2)
      .withMessage(messages.PASSWORD_LENGTH_SHORT),
  ],
};
