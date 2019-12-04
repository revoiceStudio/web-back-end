const mysql = require("mysql");
const todayQuiz = mysql.createPool(JSON.parse(process.env.todayQuiz));
const lastBread = mysql.createPool(JSON.parse(process.env.lastBread));
module.exports = {
  todayQuiz: todayQuiz,
  lastBread: lastBread
};
