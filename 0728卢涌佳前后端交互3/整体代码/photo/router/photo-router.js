const Router = require("koa-router");

const { photoController } = require("../controller/index");

const router = new Router();

router.get("/api/getPhotos", photoController.getPhotos);

router.post("/api/upload", photoController.upload);


module.exports = router;
