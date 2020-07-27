const { getDB } = require("../db");

module.exports = {
  /**
   *根据用户名查找users记录
   * @param {用户名} username
   */
  async selectIdByUsername(username) {
    const sql = `SELECT * FROM users WHERE username = ?`;
    const result = await getDB().execute(sql, [username]);
    return result;
  },

  /**
   * 根据用户名和密码查找users记录
   * @param {用户名} username 
   * @param {密码} password 
   */
  async selectByUsername(username, password) {
    const sql = `SELECT * FROM users WHERE username = ? AND password = ?`;
    const result = await getDB().execute(sql, [username, password]);
    return result;
  },

  /**
   * 根据用户id、文件存放地址、创建时间创建一条用户关于上传图片的记录
   * @param {用户id} userId 
   * @param {文件存放地址} imgUrl 
   * @param {创建时间} createTime 
   */
  async create(userId, imgUrl, createTime) {
    const sql = `INSERT INTO user_img(userId,imgUrl,createtime) VALUES(?,?,?)`;
    const result = await getDB().execute(sql, [userId, imgUrl, createTime]);
    return result;
  },
};
