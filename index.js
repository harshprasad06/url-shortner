const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const userRoute = require("./routes/user");
const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const URL = require("./models/url");
const { connectDb } = require("./config/connection");
const {checkAuth, restrictToLoggedinUserOnly } = require("./middlewares/auth");

const app = express();
const PORT = 5000;

// middlware

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// connection

connectDb("mongodb://localhost:27017/url-shortner")
  .then(() => console.log("db connected"))
  .catch((err) => {
    console.log("failed to connect db", err);
  });

// set the view engine to ejs
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// routes
app.use("/", checkAuth, staticRoute);
app.use("/user", userRoute);
app.use("/url", restrictToLoggedinUserOnly, urlRoute);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
 