// 鉴权忽略的路由
const ignoreUrlReg = [/^\/public/];

// 鉴权的token盐salt
const secret = "melonfuckingyouahahahahahha2123716274878*&^&*^";

// 数据库信息
const mysqlParam = {
  host: "localhost",
  user: "root",
  password: "root",
  database: "web09",
};

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

module.exports = {
  ignoreUrlReg,
  secret,
  mysqlParam,
};
