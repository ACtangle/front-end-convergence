const { userService } = require("../../server/user/index");
const { renderToTipsPage } = require("../../utils/index");

module.exports = {
  // 必须使用async和await

  //首页路由
  async index(ctx) {
    await ctx.render("home/index");
  },

  //上传文件
  async upload(ctx) {
    const { username, age } = ctx.request.body;
    const { img } = ctx.request.files;
    if(+age > 120 || +age < 0) {
      await renderToTipsPage(ctx, "home/message.pug", "年龄必须在0~120之间");
      return;
    }
    // 数据校验
    ctx.verifyParams({
      username: { type: "string", required: true },
      age: { type: "string", required: true },
    });
    if (!parseInt(age)) {
      await renderToTipsPage(ctx, "home/message.pug", "请输入正确格式的值");
      return;
    }
    if (img.size == 0) {
      await renderToTipsPage(ctx, "err/404.pug", "请添加文件!");
      return;
    }
    const result = await userService.upload(username, parseInt(age), img);
    if (result.affectedRows > 0) {
      await renderToTipsPage(ctx, "home/message.pug", "插入成功!");
    } else {
      await renderToTipsPage(ctx, "home/message.pug", "插入失败!");
    }
  },
};
