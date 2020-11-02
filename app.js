const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

const connection = mysql.createConnection({
  // host: "localhost",
  // user: "root",
  // password: "",
  // database: "join_us",
  // port:
});

app.get("/", function (req, res) {
  const q = "SELECT COUNT(*) AS count FROM users";
  connection.query(q, function (error, results) {
    if (error) throw error;
    const count = results[0].count;
    res.render("home", { count: count });
  });
});

app.post("/register", function (req, res) {
  const person = { email: req.body.email };
  connection.query("INSERT INTO users SET ?", person, function (err, result) {
    res.redirect("/");
  });
});

app.listen(8090, function () {
  console.log("App listening on port 8090!");
});
