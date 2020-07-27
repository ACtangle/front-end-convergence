
// 页面跳转的路由: 路由名字跟页面名字需一致
const ignoreUrl = ['/login','/photo'];

// 鉴权忽略的接口
const regexIgnoreUrl = [/^\/login/, /^\/photo/,/^\/checkUser/,];

// 鉴权的token盐salt
const secret = "melonfuckingyouahahahahahha2123716274878*&^&*^";

module.exports = {
  ignoreUrl,
  regexIgnoreUrl,
  secret
}