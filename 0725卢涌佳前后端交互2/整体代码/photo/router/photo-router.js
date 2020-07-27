const Router = require("koa-router");

const { photoController, loginController } = require("../controller/index");

const router = new Router();

router.post("/upload", photoController.upload);

router.get("/getPhotos", photoController.getPhotos);


module.exports = router;
