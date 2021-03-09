const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const passport = require("passport");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(__dirname + "/public"));

const expressSession = require("express-session")({
  secret: "secret",
  resave: false,
  saveUninitialized: false,
});

app.use(expressSession);

app.use(passport.initialize());
app.use(passport.session());

require("./routes")(app, passport);

app.listen(3000, () => {
  console.log("listening for connections on 3000");
});
