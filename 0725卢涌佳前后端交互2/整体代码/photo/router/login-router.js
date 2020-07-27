const Router = require("koa-router");

const { loginController } = require("../controller/index");

const router = new Router();

router.post("/checkUser", loginController.login);

router.get("/logOut", loginController.logout);

module.exports = router;
