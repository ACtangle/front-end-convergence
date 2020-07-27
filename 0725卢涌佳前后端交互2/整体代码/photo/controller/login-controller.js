const jwt = require("jsonwebtoken");
const { photoService,loginService } = require("../service/index");
const { ResponseVO } = require("../VO/index");

const secret = "melonfuckingyouahahahahahha2123716274878*&^&*^";

module.exports = {
  async login(ctx) {
    // console.log(ctx.request.body);
    ctx.type = "application/json";
    const { username, password } = ctx.request.body;
    const [result] = await loginService.selectByUsername(
      username,
      password
    );

    if (result.length >= 1) {
      // ctx.session.userState = true;
      // ctx.session.username = username;
      //  生成token
      const token = jwt.sign({ username }, secret, {
        expiresIn: "1h",
      });
      console.log("uploadImg-controller --> login() --> token : ", token);
      ctx.body = new ResponseVO(1,'login success',{token});
      return;
    }
    ctx.body = new ResponseVO(0,'login failure',{});
  },

  logout(ctx) {
    const { username } = ctx.state.user;
    console.log(
      "uploadingImg-controller.js --> logout() --> username : ",
      username
    );
    if (username) {
      ctx.body = new ResponseVO(1, 'log out success',{});
      return;
    }
    ctx.body = new ResponseVO(0,'log out failure', {});
  },
}