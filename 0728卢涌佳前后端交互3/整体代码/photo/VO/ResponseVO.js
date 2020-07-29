// 后端返回前端交互数据类
// 单例模式

class ResponseVO {
  constructor(state, msg, data) {
    if (ResponseVO.instance) {
      ResponseVO.instance.state = state;
      ResponseVO.instance.msg = msg;
      ResponseVO.instance.data = data;
      console.log("second");
      return ResponseVO.instance;
    }
    // 单例
    ResponseVO.instance = this;
    this.state = state;
    this.msg = msg;
    this.data = data;
    console.log("first");
  }
}

module.exports = ResponseVO;
