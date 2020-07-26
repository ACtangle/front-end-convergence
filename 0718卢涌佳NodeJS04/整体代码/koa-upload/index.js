const Koa = require("koa");
const serve = require("koa-static");
const views = require("koa-views");
const koaBody = require("koa-body");
const koaParameter = require('koa-parameter');

const { initDB } = require("./db");
const { userRouter } = require("./router/index");
// 初始化数据库连接
initDB();

const app = new Koa();


app.use(serve(__dirname + "/static"));

app.use(views(__dirname + "/views"), {
  extension: "pug",
});

app.use(
  koaBody({
    multipart: true,
  })
);

app.use(koaParameter(app));

app.use(userRouter.routes());

app.listen(8080, () => {
  console.log("localhost server is listening 8080");
});
