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
const { ignoreUrl, secret } = require("./config/config");
const { toPage, loginRouter, photoRouter } = require("./router/index");


// koa框架类
const app = new Koa();

// app.keys = session_signed_key;

// 初始化数据库连接
initDB();

// Custom 401 handling (first middleware)
// 鉴权劫持异常
// app.use(function (ctx, next) {
//   return next().catch((err) => {
//     if (err.status === 401) {
//       ctx.status = 401;
//       ctx.body = {
//         error: err.originalError ? err.originalError.message : err.message,
//       };
//     } else {
//       throw err;
//     }
//   });
// });

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
    path: ignoreUrl,
    // path: [/^\/public/]
  })
);

// 日志组件: koa-logger
app.use(koaLogger());

// 请求头安全组件:koa-helmet
app.use(koaHelmet());

// 中间件session
// app.use(koaSession(sessionConfig, app));

// 中间件router层
// 页面跳转路由
app.use(toPage.routes());
app.use(loginRouter.routes());
app.use(photoRouter.routes());

app.listen(8080);
