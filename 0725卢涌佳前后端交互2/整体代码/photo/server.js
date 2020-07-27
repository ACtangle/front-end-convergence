const Koa = require("koa");
const serve = require("koa-static");
const koaBody = require("koa-body");
const koaViews = require("koa-views");
const koaHelmet = require("koa-helmet");
const koaLogger = require("koa-logger");
// const koaSession = require("koa-session");
const koaJwt = require("koa-jwt");
const path = require("path");

const { initDB } = require("./db");
const { uploadImgRouter, toPage } = require("./router/index");

// 登录token的盐salt
const secret = "melonfuckingyouahahahahahha2123716274878*&^&*^";

// const { Session } = require("inspector");
// app.keys = session_signed_key;

// const session_signed_key = ["_session_signed_key"]; // 这个是配合signed属性的签名key
// const sessionConfig = {
//   key: "koa:sess", //cookie key (default is koa:sess)
//   maxAge: 1800000, // 过期时间(毫秒) maxAge in ms (default is 1 days)
//   overwrite: true, //是否可以overwrite    (默认default true)
//   httpOnly: true, //cookie是否只有服务器端可以访问 httpOnly or not (default true)
//   signed: true, //签名默认true
//   rolling: false, //在每次请求时强行设置cookie，这将重置cookie过期时间（默认：false）
//   renew: false, //(boolean) renew session when session is nearly expired,
// };

// koa框架类
const app = new Koa();


// 初始化数据库连接
initDB();

// 前端向后端传递的格式
app.use(
  koaBody({
    multipart: true,
  })
);

// 静态资源访问中间件koa-static
app.use(serve(__dirname + "/static"));

// 页面ejs模板中间件koa-views
app.use(koaViews(path.resolve(__dirname, "./view")), {});

// 自动鉴权中间件koa-jwt
app.use(
  koaJwt({
    secret,
  }).unless({
    path: [/^\/login/, /^\/checkUser/, /^\/photo/],
  })
);

// 日志组件: koa-logger
app.use(koaLogger());

// 请求头安全组件:koa-helmet
app.use(koaHelmet());

// 中间件session
// app.use(koaSession(sessionConfig, app));

// 页面跳转路由
app.use(toPage.routes());

// 中间件router层
app.use(uploadImgRouter.routes());

app.listen(8080);
