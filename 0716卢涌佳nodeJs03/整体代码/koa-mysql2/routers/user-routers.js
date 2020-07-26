// user router ： 用户路由

const { getDB } = require("../db");

module.exports = async (ctx) => {
  const { username, age } = ctx.query;
  const [row] = await getDB().execute(
    "INSERT INTO users( username, age ) VALUES (?,?)",
    [username, age],
    function (err, results) {
      if (err) {
        throw err;
      }
    }
  );
  ctx.body = row;
};
