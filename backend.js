const express = require("express");
const passport = require("passport");

const app = express();

app.use(express.static("public"));

const bodyParser = require("body-parser");
const expressSession = require("express-session")({
  secret: "secret",
  resave: false,
  saveUninitialized: false,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSession);

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/index.html",
    failureRedirect: "/index.html",
  })
);

app.listen(3000, () => {
  console.log("listening for connections on 3000");
});
