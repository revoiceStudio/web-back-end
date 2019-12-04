var pool = require("./dbconfig");

const selectTodayQuiz = callback => {
  const data = [];
  const param = {};
  const sql = "SELECT play_dt,locale,name,user_point FROM users";
  executeSQL(pool.todayQuiz, sql, data, param, callback);
};
const selectLastBread = callback => {
  const data = [];
  const param = {};
  const sql = "SELECT locale,name,score,count FROM users";
  executeSQL(pool.lastBread, sql, data, param, callback);
};

const executeSQL = (pool, sql, data, param, callback) => {
  if (pool) {
    pool.getConnection((err, conn) => {
      if (err) {
        if (conn) {
          conn.release();
        }
        console.log(err);
        callback(err, null);
        return;
      }

      const exec = conn.query(sql, data, (err, result) => {
        conn.release();
        if (err) {
          console.log("SQL 실행 시 오류 발생함.");
          console.dir(err);

          callback(err, null);
          return;
        }
        callback(null, result, param);
      });
    });
  }
};
module.exports = { selectTodayQuiz, selectLastBread };
