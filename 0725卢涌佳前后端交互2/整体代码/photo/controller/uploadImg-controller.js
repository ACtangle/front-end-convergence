const jwt = require("jsonwebtoken");
const { uploadImgService } = require("../service/index");
const controller = require(".");
const secret = "melonfuckingyouahahahahahha2123716274878*&^&*^";

module.exports = {
  async upload(ctx) {
    const { img } = ctx.request.files;
    const { username } = ctx.request.body;
    console.log(username);
    await uploadImgService.upload(username, img);
    ctx.body = "上传成功";
  },

  async getPhotos(ctx) {
    // 鉴权: koa-jwt自动鉴权

    // const { username } = ctx.request.body;
    // console.log(
    //   "uploadImg-controller.js --> getPhotos() --> username:",
    //   username
    // );

    console.log(
      "uploadImg-controller.js --> getPhotos() --> ctx.request.body:",
      ctx.request.body
    );

    console.log(
      "uploadImg-controller.js --> getPhotos() --> ctx.state.user:",
      ctx.state.user
    );
    const { username } = ctx.state.user;

    const [result] = await uploadImgService.getPhotos(username);
    // console.log('result:',result);
    ctx.type = "application/json";
    if (result.length > 1) {
      ctx.body = {
        state: 1,
        msg: "success",
        data: { result, username },
      };
      return;
    }
    ctx.body = {
      state: 1,
      msg: "failure",
    };
  },

  async login(ctx) {
    // console.log(ctx.request.body);
    ctx.type = "application/json";
    const { username, password } = ctx.request.body;
    const [result] = await uploadImgService.selectByUsername(
      username,
      password
    );

    console.log(result);
    if (result.length >= 1) {
      // ctx.session.userState = true;
      // console.log('666',ctx.session);
      // ctx.session.username = username;
      //  生成token
      const token = jwt.sign({ username }, secret, {
        expiresIn: "1h",
      });
      console.log("uploadImg-controller --> login() --> token : ", token);
      ctx.body = {
        state: 1,
        msg: "login success",
        data: {
          token,
        },
      };
      return;
    }
    ctx.body = {
      state: 0,
      msg: "login failure",
      data: {},
    };
  },

  logout(ctx) {
    const { username } = ctx.state.user;
    console.log(
      "uploadingImg-controller.js --> logout() --> username : ",
      username
    );
    if (username) {
      ctx.body = {
        state: 1,
        msg: "logout success",
        data: {},
      };
      return;
    }
    ctx.body = {
      state: 0,
      msg: "logout failure",
      data: {},
    };
  },
};
