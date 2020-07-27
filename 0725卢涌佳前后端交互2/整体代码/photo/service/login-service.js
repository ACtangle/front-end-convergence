const {usersModel} = require('../model/index');

module.exports = {
  async selectByUsername(username, password) {
    return await usersModel.selectByUsername(username, password);
  },
}