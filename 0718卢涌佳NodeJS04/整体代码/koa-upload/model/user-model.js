const { getDB } = require("../db");

module.exports = {
  async create(username,age,imgUrl,createTime) {
    const sql = "INSERT INTO users(username,age,imgUrl,createTime) VALUES(?,?,?,?)";
    const [result] = await getDB().execute(sql, [username,age,imgUrl,createTime]);
    return result;
  },
};
