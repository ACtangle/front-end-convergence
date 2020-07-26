const { getDB } = require("../db");
module.exports = {
  async create(userId, imgUrl, createTime) {
    const sql = `INSERT INTO user_img(userId,imgUrl,createtime) VALUES(?,?,?)`;
    const result = await getDB().execute(sql, [userId, imgUrl, createTime]);
    return result;
  },
  async getPhotos(username) {
    const sql = ` SELECT
                    u.id,
                    u.username,
                    ui.imgUrl 
                  FROM
                    users u
                    LEFT JOIN user_img ui ON u.id = ui.userId 
                  WHERE
                    username = ?`;
    const result = await getDB().execute(sql, [username]);
    return result;
  },
  async selectIdByUsername(username) {
    const sql = `SELECT * FROM users WHERE username = ?`;
    const result = await getDB().execute(sql, [username]);
    return result;
  },
  async selectByUsername(username, password) {
    const sql = `SELECT * FROM users WHERE username = ? AND password = ?`;
    const result = await getDB().execute(sql, [username, password]);
    return result;
  },
};
