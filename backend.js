const express = require("express");

const app = express();
const router = express.Router();

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(3000, () => {
  console.log("listening for connections on 3000");
});
