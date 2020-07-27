const { getDB } = require("../db");
module.exports = {
  /**
   * 获取指定用户的所有图片信息
   * @param {用户名} username
   */
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
};
