/**
 * 前台axios调用接口数据
 */

import myAxios from "./myAxios.js";

//login.js
export function login(username, password) {
  const postData = { username, password };
  // myAxios
  //   .post("/public/login", postData)
  //   .then((response) => {
  //     const data = response.data;
  //     if (data.state == 0) {
  //       alert(`详细信息: ${data.msg}`);
  //     } else {
  //       localStorage.setItem("token", data.data.token);
  //       window.location = "photo.html";
  //     }
  //   })
  //   .catch((err) => {});

  myAxios({
    url: "/public/login",
    method: "post",
    data: postData,
  })
    .then((response) => {
      const data = response.data;
      if (data.state == 0) {
        alert(`详细信息: ${data.msg}`);
      } else {
        localStorage.setItem("token", data.data.token);
        window.location = "photo.html";
      }
    })
    .catch((err) => {
      throw err("api.js --> login --> err: ", err);
    });
}

//main.js
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
    .then((response) => {
      const data = response.data;
      // console.log("api.js --> upload --> response: ", response);
      return data;
    })
    .catch((err) => {
      throw err("api.js --> upload --> err: ", err);
    });
}

export function getAllPhotos() {
  return myAxios({
    url: "/api/getPhotos",
    method: "get",
  })
    .then((response) => {
      const data = response.data;
      return data;
    })
    .catch((err) => {
      throw err("api.js --> getAllPhotos --> err: ", err);
    });
}

export function logOut() {
  return myAxios({
    url: "/api/logout",
    method: "get",
  })
    .then((response) => {
      const data = response.data;
      if (data.state == 1) {
        localStorage.setItem("token", "");
        window.location = "login.html";
      }
    })
    .catch((err) => {
      throw err("api.js --> logOut --> err: ", err);
    });
}
