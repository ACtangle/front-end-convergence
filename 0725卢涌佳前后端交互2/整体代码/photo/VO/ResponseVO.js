
// 后端返回前端交互数据类

module.exports = class ResponseVO{

  constructor(state, msg ,data) {
    this.state = state || -1;
    this.msg = msg || '';
    this.data = data || {};
  }

}