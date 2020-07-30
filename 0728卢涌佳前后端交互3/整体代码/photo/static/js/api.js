/**
 * 前台axios调用接口数据
 */

import myAxios from "./myAxios.js";

//login.js
export function login(username, password) {
  const postData = { username, password };
  myAxios
    .post("/public/login", postData)
    .then((response) => {
      const data = response.data;
      if (data.state == 0) {
        alert(`详细信息: ${data.msg}`);
      } else {
        localStorage.setItem("token", data.data.token);
        window.location = "photo.html";
      }
    })
    .catch((err) => {});
}

//main.js
export function upload(username, previewImg) {
  const postFormData = new FormData();
  postFormData.append("img", previewImg.getFile());
  postFormData.append("username", username);

  console.dir(myAxios);
  return myAxios
    .post("/api/upload", postFormData)
    .then((response) => {
      const data = response.data;
      console.log("api.js --> upload --> response: ", response);
      return data;
    })
    .catch((err) => {});
}

export function getAllPhotos() {
  return myAxios
    .get("/api/getPhotos")
    .then((response) => {
      const data = response.data;
      return data;
    })
    .catch((err) => {});
}

export function logOut() {
  return myAxios
    .get("/api/logout")
    .then((response) => {
      const data = response.data;
      if (data.state == 1) {
        localStorage.setItem("token", "");
        window.location = "login.html";
      }
    })
    .catch((err) => {});
}
