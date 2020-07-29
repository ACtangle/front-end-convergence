// const { ignoreUrl } = require("../config/config");
const KoaRouter = require("koa-router");

const router = new KoaRouter();

// 页面路由
// console.log('忽略的路由' ,ignoreUrl);
// ignoreUrl.forEach((url) => {
//   router.get(url, async (ctx) => {
//     await ctx.render(url.replace("/", ""));
//     console.log(url);
//   });
// });

module.exports = router;