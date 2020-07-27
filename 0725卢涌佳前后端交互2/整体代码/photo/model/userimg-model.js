const { getDB } = require("../db");

// 对应表字段
let userImg = {
  id: undefined,
  userId: undefined,
  imgUrl: undefined,
  createtime: undefined,
};

module.exports = {

  /**
   * 动态sql
   * 单表查询:
   *        1. 有参：则根据匹配条件搜索
   *        2. 有参：但是不匹配字段值返回空数组
   *        3. objParam为空对象则搜索全表
   * @param {克隆传递的对象} param0
   */
  async selectByUserObject({ ...objParam }) {
    const objAssign = Object.assign({}, userImg, objParam);
    let arr = [];
    let sql = `SELECT * FROM user_img `;
    let result;
    if (objParam) {
      sql += `WHERE`;
      Object.keys(objAssign).forEach((key) => {
        if (objAssign[key] != undefined) {
          sql += ` ${key}=? AND`;
          arr.push(objAssign[key]);
        }
      });
      sql += ` 1=1`;
    }
    result = await getDB().execute(sql, arr);
    return result;
  },

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
