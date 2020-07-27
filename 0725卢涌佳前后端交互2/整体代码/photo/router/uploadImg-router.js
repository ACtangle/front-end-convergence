const Router = require("koa-router");

const { uploadImgController } = require("../controller/index");

const router = new Router();

router.post("/upload", uploadImgController.upload);

router.get("/getPhotos", uploadImgController.getPhotos);

router.post("/checkUser", uploadImgController.login);

router.get("/logOut", uploadImgController.logout);

module.exports = router;
