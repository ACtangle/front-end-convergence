const KoaRouter = require("koa-router");

const router = new KoaRouter();

// login页面
router.get("/login", async (ctx) => {
  await ctx.render("login");
});

// 相册页面
router.get("/photo", async (ctx) => {
  // const { username } = ctx.query;
  // if (!username) {
    // await ctx.render("404");
  // } else {
    await ctx.render('photo');
  // }
});

// TODO: 封装一个页面动态跳转的方法


module.exports = router;
