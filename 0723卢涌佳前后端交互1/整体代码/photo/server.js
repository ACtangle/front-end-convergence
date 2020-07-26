const Koa = require("koa");
const serve = require("koa-static");
const koaBody = require("koa-body");
const koaViews = require("koa-views");
const koaSession = require("koa-session");
const path = require("path");

const { initDB } = require("./db");
const { uploadImgRouter, toPage } = require("./router/index");
const { Session } = require("inspector");

const session_signed_key = ["_session_signed_key"]; // 这个是配合signed属性的签名key
const sessionConfig = {
  key: "koa:sess", //cookie key (default is koa:sess)
  maxAge: 1800000, // 过期时间(毫秒) maxAge in ms (default is 1 days)
  overwrite: true, //是否可以overwrite    (默认default true)
  httpOnly: true, //cookie是否只有服务器端可以访问 httpOnly or not (default true)
  signed: true, //签名默认true
  rolling: false, //在每次请求时强行设置cookie，这将重置cookie过期时间（默认：false）
  renew: false, //(boolean) renew session when session is nearly expired,
};

const app = new Koa();

app.keys = session_signed_key;

initDB();
app.use(
  koaBody({
    multipart: true,
  })
);

app.use(serve(__dirname + "/static"));

app.use(koaViews(path.resolve(__dirname, "./view")), {});

app.use(koaSession(sessionConfig, app));

app.use(toPage.routes());
app.use(uploadImgRouter.routes());

app.listen(8080);
