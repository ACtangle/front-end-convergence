const KoaRouter = require("koa-router");

const router = new KoaRouter();

// login页面
router.get("/login", async (ctx) => {
  await ctx.render("login");
});

// 相册页面
router.get("/photo", async (ctx) => {
  const { username } = ctx.query;
  if (!username) {
    await ctx.render("404");
  } else {
    await ctx.render('photo');
  }
});

// function toPage(pageUrl, object) {
//   router.get(pageurl, async (ctx) => {
//     await ctx.render(pageUrl.substring() + 1, object);
//   });
//   return router;
// }

module.exports = router;
