/**
 * 前台ajax调用接口数据
 */

const token = localStorage.getItem("token");
// main.js
export function checkLogin() {
    if (token === '' || token === null || token === undefined) {
      window.location = '/login';
      return;
    }
    const xhr = new XMLHttpRequest();
    xhr.open("post", "/checkLogin");
    xhr.onload = () => {
      const data = xhr.response;
      console.log(data);
    };
    xhr.setRequestHeader("authorization", "Bearer " + token);
    xhr.send(token);
}

export function upload(username, previewImg) {
  return new Promise((resolve, reject) => {
    const formData = new FormData();
    formData.append("img", previewImg.getFile());
    formData.append("username", username);
    // 图片上传到 server
    const xhr = new XMLHttpRequest();
    xhr.open("post", "/upload");
    xhr.onload = () => {
      resolve(JSON.parse(xhr.response));
    };
    xhr.upload.onprogress = (e) => {
      previewImg.updateProgress(e.loaded, e.total);
    };
    xhr.setRequestHeader("authorization", "Bearer " + token);
    // 显示上传进度
    xhr.send(formData);
  });
}

export function getAllPhotos() {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    console.log("upload.js --> getAllPhotos() --> token : ", token);

    xhr.open("get", "/getPhotos");
    xhr.onload = () => {
      // console.log(
      //   "upload.js --> getAllPhotos() --> xhr.response : ",
      //   xhr.response
      // );
      const dataArray = JSON.parse(xhr.response);
      console.log("upload.js --> getAllPhotos() --> dataArray : ", dataArray);
      resolve(dataArray);
    };
    // 默认方式：传入authorization头的值一定为"Bearer " + token, 后端接口自动鉴权
    xhr.setRequestHeader("authorization", "Bearer " + token);
    xhr.send();
  });
}

export function logOut() {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("get", "/logout");
    xhr.onload = () => {
      console.log("upload.js --> logOut() --> xhr.response : ", xhr.response);
      const { state } = JSON.parse(xhr.response);
      console.log(state);
      if (state == 1) {
        localStorage.setItem("token", "");
        window.location = "/login";
      }
    };
    xhr.setRequestHeader("authorization", "Bearer " + token);
    xhr.send();
  });
}

// login.js
export function login(username, password) {
  return new Promise((reslove, reject) => {
    const postData = new FormData();
    postData.append("username", username);
    postData.append("password", password);

    const xhr = new XMLHttpRequest();
    xhr.open("post", "/login", true);
    xhr.onload = () => {
      const result = JSON.parse(xhr.response);
      reslove(result);
      if (result.state == 0) {
        alert(`详细信息:${result.msg}`);
      } else {
        localStorage.setItem("token", result.data.token);
        window.location = "/photo";
      }
    };
    xhr.setRequestHeader("authorization", "Bearer " + token);
    xhr.send(postData);
  });
}
