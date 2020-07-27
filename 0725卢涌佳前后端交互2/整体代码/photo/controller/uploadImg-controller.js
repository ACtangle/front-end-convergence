const jwt = require("jsonwebtoken");
const { uploadImgService } = require("../service/index");
const { ResponseVO } = require("../VO/index");
const secret = "melonfuckingyouahahahahahha2123716274878*&^&*^";

module.exports = {
  async upload(ctx) {
    const { img } = ctx.request.files;
    const { username } = ctx.request.body;
    await uploadImgService.upload(username, img);
    ctx.body = new ResponseVO(1,'上传成功',{});
  },

  async getPhotos(ctx) {
    // 鉴权: koa-jwt自动鉴权
    const { username } = ctx.state.user;

    console.log(
      "uploadImg-controller.js --> getPhotos() --> ctx.request.body:",
      ctx.request.body
    );

    console.log(
      "uploadImg-controller.js --> getPhotos() --> ctx.state.user:",
      ctx.state.user
    );

    const [result] = await uploadImgService.getPhotos(username);
    ctx.type = "application/json";
    if (result.length > 1) {
      ctx.body = new ResponseVO(1, "success", { result, username });
      return;
    }
    ctx.body = new ResponseVO(0, "failure", { result: [], username });
  },

  async login(ctx) {
    // console.log(ctx.request.body);
    ctx.type = "application/json";
    const { username, password } = ctx.request.body;
    const [result] = await uploadImgService.selectByUsername(
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
};
