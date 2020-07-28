const Router = require("koa-router");

const { loginController } = require("../controller/index");

const router = new Router();

router.post("/login", loginController.login);
router.post('/checkLogin',loginController.checkLogin);

router.get("/logOut", loginController.logout);

module.exports = router;
