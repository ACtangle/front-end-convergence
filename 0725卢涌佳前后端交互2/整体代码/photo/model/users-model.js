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
   *        3. objParam为空对象则搜索全表
   * @param {克隆传递的对象} objParam
   */
  async selectByUserObject({ ...objParam }) {
    // console.log(
    //   " user-models.js --> selectByObjectParams({...objParam}) --> objParam : ",
    //   objParam
    // );
    const objAssign = Object.assign({}, user, objParam);
    // console.log(
    //   " user-models.js --> selectByObjectParams({...objParam}) --> objParam : ",
    //   objAssign
    // );
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
    // console.log(
    //   " users-model --> selectByObjectParams({...objParam}) --> arr : ",
    //   arr
    // );
    result = await getDB().execute(sql, arr);
    return result;
  },

};
