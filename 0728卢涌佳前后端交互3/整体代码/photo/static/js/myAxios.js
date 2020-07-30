/**
 * 封装的axios
 * 开发、调试环境配置
 */
import { instanceConfig } from "./config.js";

const myAxios = axios.create(instanceConfig);

// 请求拦截
myAxios.interceptors.request.use((config) => {
  // 判断是否登录
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.authorization = "Bearer " + token;
  }
  return config;
});

// 统一处理错误
// 响应拦截
myAxios.interceptors.response.use(
  (res) => {
    console.log(
      "myAxios --> 响应拦截器获取调用后端接口返回的数据 --> res: ",
      res
    );
    return res;
  },
  (err) => {
    console.log(err.response);
    if (err.response.status === 401) {
      // window.location = '/401.html';
    }
    return Promise.reject(err);
  }
);

export default myAxios;
