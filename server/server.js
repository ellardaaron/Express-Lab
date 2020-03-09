const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const fs = require("fs");

const secretArray = [];

let app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.post("/secret-form", (req, res) => {
  console.log(req.body.text);
  secretArray.push(req.body.text);
  fs.writeFile("secrets.json", JSON.stringify(secretArray), err => {
    if (err) {
      throw err;
    }
  });
  res.redirect("/");
});

app.post("/formSubmissions", (req, res) => {
  let dataPath = path.resolve(__dirname, "../secrets.json");
  fs.readFile(dataPath, "utf8", (err, fileContents) => {
    if (err) {
      console.log(err);
      return;
    }
    try {
      res.send(fileContents);
    } catch (err) {
      console.error(err);
    }
  });
});

app.use(express.static(path.join(__dirname, "../public")));

app.listen(3000);

//YOU can stope backing up

//You CAN STOP BACKING UP
