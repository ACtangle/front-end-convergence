// 路由跳转工具

module.exports = {
  // 跳转页面
  async renderToTipsPage(ctx, pageUrl, message) {
    console.log(pageUrl, message);
    await ctx.render(pageUrl, {
      message,
    });
  },
};
