const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = process.env.DB_NAME;
const SESSION_SECRET = process.env.SESSION_SECRET;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

module.exports = { PORT, MONGODB_URI, DB_NAME, SESSION_SECRET, ADMIN_EMAIL };
