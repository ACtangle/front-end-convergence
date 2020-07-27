const { getDB } = require("../db");

// 对应表字段
let user = {
  id: undefined,
  username: undefined,
  password: undefined,
  createtime: undefined,
};

module.exports = {
  /**
   * 动态sql
   * 单表查询:
   *        1. 有参：则根据匹配条件搜索
   *        2. 有参：但是不匹配字段值返回空数组
   *        2. objParam为空对象则搜索全表
   * @param {克隆传递的对象} param0
   */
  async selectByUserObject({ ...objParam }) {
    console.log(
      " user-models.js --> selectByObjectParams({...objParam}) --> objParam : ",
      objParam
    );
    const objAssign = Object.assign({}, user, objParam);
    console.log(
      " user-models.js --> selectByObjectParams({...objParam}) --> objParam : ",
      objAssign
    );
    let arr = [];
    let sql = `SELECT * FROM users `;
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
    console.log(
      " users-model --> selectByObjectParams({...objParam}) --> sql : ",
      sql
    );
    console.log(
      " users-model --> selectByObjectParams({...objParam}) --> arr : ",
      arr
    );
    result = await getDB().execute(sql, arr);
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
