/**
 * 封装的axios
 * 开发、调试环境配置
 */
import { instanceConfig } from "./config.js";

const myAxios = axios.create(instanceConfig);

// 请求拦截
myAxios.interceptors.request.use(
  (config) => {
    // 判断是否登录
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.authorization = "Bearer " + token;
    }
    return config;
  },
  (err) => {
    console.log("myAxios.js --> 调用接口错误 --> err:", err
    )
    return Promise.reject(err);
  }
);

// 统一错误处理
// 响应拦截
myAxios.interceptors.response.use(
  (res) => {
    // console.log(
    //   "myAxios.js --> 响应拦截器获取调用后端接口返回的数据 --> res: ",
    //   res
    // );
    return res;
  },
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 返回 401 清除token信息并跳转到登录页面
          localStorage.setItem('token','');
          window.location = "401.html";
        case 404:
          window.location = "404.html";
      }
    }
    return Promise.reject(error.response.data); // 返回接口返回的错误信息
  }
);

export default myAxios;
