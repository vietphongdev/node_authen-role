const express = require("express");
const createHttpError = require("http-errors");
const morgan = require("morgan");
const session = require("express-session");
const mongoose = require("mongoose");
const connectFlash = require("connect-flash");
const passport = require("passport");
const connectMongo = require("connect-mongo");
const { SESSION_SECRET } = require("./configs");
const { ensureLoggedIn } = require("connect-ensure-login");
const { ensureAdmin } = require("./middlewares/auth.middleware");

// Initialization
const app = express();
app.use(morgan("dev"));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Init Session
const MongoStore = connectMongo(session);
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      // secure: true,
      httpOnly: true,
    },
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

// Passport Authentication
app.use(passport.initialize());
app.use(passport.session());
require("./utils/passport");
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

// Connect Flash
app.use(connectFlash());
app.use((req, res, next) => {
  res.locals.messages = req.flash();
  next();
});

// Routes
app.use("/", require("./routes/index.route"));
app.use("/auth", require("./routes/auth.route"));
app.use(
  "/user",
  ensureLoggedIn({ redirectTo: "/auth/login" }),
  require("./routes/user.route")
);
app.use(
  "/admin",
  ensureLoggedIn({ redirectTo: "/auth/login" }),
  ensureAdmin,
  require("./routes/admin.route")
);
// 404 Handler
app.use((req, res, next) => {
  next(createHttpError.NotFound());
});

// Error Handler
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.render("error_40x", { error });
});

module.exports = app;
