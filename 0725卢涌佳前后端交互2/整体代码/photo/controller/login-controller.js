const jwt = require("jsonwebtoken");

const { loginService } = require("../service/index");
const { ResponseVO } = require("../VO/index");
const { secret } = require("../config/config");

module.exports = {
  async login(ctx) {
    console.log("login-controller --> login --> request : ", ctx.request.body);
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
    console.log("login-controller --> login --> result : ", result);
    if (result.length <= 0) {
      ctx.body = new ResponseVO(0, "账号或者密码错误，请重新输入");
      return;
    }
    //  生成token
    const token = jwt.sign({ username }, secret, {
      expiresIn: "1h",
    });
    console.log("login-controller --> login --> token : ", token);

    ctx.body = new ResponseVO(1, "login success", { token });
  },

  checkLogin(ctx) {
    const token = ctx.request.body;

    console.log("login-controller --> checkLogin --> request: token: ", token);
    console.log(
      "login-controller --> checkLogin --> ctx.header.authorization : ",
      ctx.header.authorization
    );
    console.log(
      "login-controller --> checkLogin --> 后端: ctx.state.user: ",
      ctx.state.user
    );
    if(token == ctx.header.authorization.replace('Bearer ','')){
      ctx.body = new ResponseVO(1,'已登录过',{});
      return ;
    }
    ctx.body = new ResponseVO(0,'还未登录',{});
  },

  logout(ctx) {
    console.log(
      "login-controller.js --> logout --> ctx.state.user : ",
      ctx.state.user
    );
    console.log(
      "login-controller --> logout --> 后端: token: ",
      ctx.header.authorization
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
