const Koa = require("koa");
const Router = require("koa-router");
const userRouter = require("./routers/user-routers");
const { initDB } = require("./db");

const app = new Koa();

const router = new Router();

initDB();

router.get("/addUser", userRouter);

app.use(router.routes());

app.listen("8080");
