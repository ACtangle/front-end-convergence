const Router = require("koa-router");

const { uploadImgController } = require("../controller/index");

const router = new Router();

router.post("/upload", uploadImgController.upload);

// 增加过滤层，防止url强行
router.get(
  "/getPhotos",
  // async (ctx, next) => {
  //   // console.log(ctx.session.username);
  //   const { username } = ctx.request.body;
  //   // console.log(username);
  //   if (ctx.session.username != username) {
  //     await ctx.render("404");
  //     // console.log("session is not exists");
  //     ctx.body = [];
  //   } else {
  //     // console.log("session is exists");
  //     await next();
  //   }
  // },
  uploadImgController.getPhotos
);

router.post("/checkUser", uploadImgController.login);

router.get('/logOut', uploadImgController.logout);

module.exports = router;
