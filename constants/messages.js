const { model } = require("../models/user.model");

const EMAIL_INVALID = "Email must be a valid email";
const EMAIL_ALREADY = "Username/email already exists";
const PASSWORD_LENGTH_SHORT = "Password length short, min 2 char required";
const PASSWORD_NOT_MATCH = "Password do not match";
const REGISTER_SUCCESSFULLY = "Registered succesfully, you can now login";
const USER_NOT_REGISTER = "Username/email not registered";
const INCORRECT_PASSWORD = "Incorrect password";
const UNAUTHORIZED = "You are not Authorized to see this route";
const INVALID_ID = "Invalid id";

module.exports = {
  EMAIL_INVALID,
  EMAIL_ALREADY,
  PASSWORD_LENGTH_SHORT,
  PASSWORD_NOT_MATCH,
  REGISTER_SUCCESSFULLY,
  USER_NOT_REGISTER,
  INCORRECT_PASSWORD,
  UNAUTHORIZED,
  INVALID_ID,
};
