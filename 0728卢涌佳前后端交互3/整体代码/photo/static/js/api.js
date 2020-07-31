/**
 * 前台axios调用接口数据
 */

import myAxios from "./myAxios.js";

//login.js
/**
 * 请求登录接口
 * @param {用户名} username 
 * @param {密码} password 
 */
export function login(username, password) {
  const postData = { username, password };
  return myAxios({
    url: "/public/login",
    method: "post",
    data: postData,
  })
}

//main.js
/**
 * 请求上传图片
 * @param {用户名} username 
 * @param {上传的图片} previewImg 
 */
export function upload(username, previewImg) {
  const postFormData = new FormData();
  postFormData.append("img", previewImg.getFile());
  postFormData.append("username", username);
  return myAxios({
    url: "/api/upload",
    data: postFormData,
    method: "post",
    onUploadProgress: function (progressEvent) {
      previewImg.updateProgress(progressEvent.loaded, progressEvent.total);
    },
  })
}

/**
 * 请求获取当前用户已上传的所有图片
 */
export function getAllPhotos() {
  return myAxios({
    url: "/api/getPhotos",
    method: "get",
  })
}

/**
 * 请求退出当前用户
 */
export function logOut() {
  return myAxios({
    url: "/api/logout",
    method: "get",
  })
}
