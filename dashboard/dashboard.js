require("json-dotenv")("config.json");
require("dotenv").config({
  path: "credentials.env"
});
const db = require("./lib/template");
const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
// CORS 설정
app.use(cors());

function sortPoint(a, b) {
  return b.user_point - a.user_point;
}

function sortScore(a, b) {
  return b.score - a.score;
}
app.use("/todayQuiz", function(req, res) {
  db.selectTodayQuiz((err, result) => {
    console.log(result);
    result.sort(sortPoint);
    res.json(result);
  });
});
app.use("/lastBread", function(req, res) {
  db.selectLastBread((err, result) => {
    console.log(result);
    result.sort(sortScore);
    res.json(result);
  });
});

app.listen(process.env.port, () => {
  console.log("dashboard API app listening on port " + process.env.port);
});
