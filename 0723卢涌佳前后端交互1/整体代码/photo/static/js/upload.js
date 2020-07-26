export function upload(username,previewImg) {
  return new Promise((resolve, reject) => {
    const formData = new FormData();
    formData.append("img", previewImg.getFile());
    formData.append('username',username);
    // 图片上传到 server
    const xhr = new XMLHttpRequest();
    xhr.open("post", "/upload");
    xhr.onload = () => {
      resolve(xhr.response);
    };
    xhr.upload.onprogress = (e) => {
      previewImg.updateProgress(e.loaded, e.total);
    };

    // 显示上传进度
    xhr.send(formData);
  });
}

export function getAllPhotos(username) {
  return new Promise((resolve, reject) => {
    console.log("initPhotos");
    const formData = new FormData();
    formData.append('username',username);
    const xhr = new XMLHttpRequest();
    xhr.open("post", "/getPhotos");
    xhr.onload = () => {
      const dataArray = JSON.parse(xhr.response);
      resolve(dataArray);
    };
    xhr.send(formData);
  });
}
