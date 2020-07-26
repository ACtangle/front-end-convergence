const Router = require("koa-router");
const router = new Router();
const { userController } = require("../controller/user/index");

router.get("/index", userController.index);
router.post("/upload", userController.upload);

module.exports = router;
