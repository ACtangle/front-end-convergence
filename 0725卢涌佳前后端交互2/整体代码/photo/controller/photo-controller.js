const { photoService } = require("../service/index");
const { ResponseVO } = require("../VO/index");

module.exports = {
  async upload(ctx) {
    const { img } = ctx.request.files;
    const { username } = ctx.request.body;
    await photoService.upload(username, img);
    ctx.body = new ResponseVO(1, "上传成功", {});
  },

  async getPhotos(ctx) {
    // 鉴权: koa-jwt自动鉴权，ctx.state.user为验证后decoded值
    console.log(
      "photo-controller.js --> getPhotos() --> ctx.state.user:",
      ctx.state.user
    );
    console.log(
      "photo-controller.js --> getPhotos() --> ctx.header.authorization :",
      ctx.header.authorization
    );
    const { username } = ctx.state.user;

    console.log(
      "photo-controller.js --> getPhotos() --> ctx.request.body:",
      ctx.request.body
    );

    console.log(
      "photo-controller.js --> getPhotos() --> ctx.state.user:",
      ctx.state.user
    );

    const [result] = await photoService.getPhotos(username);
    ctx.type = "application/json";
    if (result.length > 1) {
      ctx.body = new ResponseVO(1, "success", { result, username });
      return;
    }
    ctx.body = new ResponseVO(0, "failure", { result: [], username });
  },
};
