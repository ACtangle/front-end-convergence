const {usersModel} = require('../model/index');

module.exports = {
  async selectByUserObject(userObject) {
    return await usersModel.selectByUserObject(userObject);
  },
}