const jwt = require("jsonwebtoken");
const { loginService } = require("../service/index");
const { ResponseVO } = require("../VO/index");

const { secret } = require("../config/config");

module.exports = {
  async login(ctx) {
    console.log(ctx.request.body);
    ctx.type = "application/json";
    const { username, password } = ctx.request.body;
    if (username === "" || password === "") {
      ctx.body = new ResponseVO(0, "账号或者密码为空，请重新输入", {});
      return;
    }
    const [result] = await loginService.selectByUserObject({
      username,
      password,
    });
    console.log("uploadImg-controller --> login() --> result : ", result);
    if (result.length <= 0) {
      ctx.body = new ResponseVO(0, "账号或者密码错误，请重新输入");
      return;
    }
    // ctx.session.userState = true;
    // ctx.session.username = username;
    //  生成token
    const token = jwt.sign({ username }, secret, {
      expiresIn: "1h",
    });
    console.log("uploadImg-controller --> login() --> token : ", token);
    ctx.body = new ResponseVO(1, "login success", { token });
  },

  logout(ctx) {
    console.log(
      "uploadingImg-controller.js --> logout() --> ctx.state.user : ",
      ctx.state.user
    );
    const { username } = ctx.state.user;
    if (username) {
      ctx.body = new ResponseVO(1, "log out success", {});
      ctx.state.user = {};
      return;
    }
    ctx.body = new ResponseVO(0, "log out failure", {});
  },
};
