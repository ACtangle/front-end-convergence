const Router = require("koa-router");

const { loginController } = require("../controller/index");

const router = new Router();

router.get("/api/logOut", loginController.logout);

router.post("/public/login", loginController.login);
router.post('/public/checkLogin',loginController.checkLogin);


module.exports = router;
