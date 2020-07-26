// 前端逻辑
import PreviewImg from "./PreviewImg.js";
import InitImg from "./InitImg.js";
import { upload, getAllPhotos } from "./upload.js";
import { getUrlParams } from "../utils/index.js";

const imgFile = document.querySelector(".imgFile");
const imgFileAdd = document.querySelector(".imgFile-add");
const showContainer = document.querySelector(".showContainer");
const loadContainer = document.querySelector(".loadContainer");
const uploadBtn = document.querySelector(".uploadBtn");
const photoContainer = document.querySelector(".photoContainer");
const closeSpan = document.querySelector(".close");
const myBtn = document.querySelector(".mybtn");
const logoutBtn = document.querySelector("#logoutBtn");
const logined_username = document.querySelector('#logined_username');
const masking = document.querySelector(".masking");

const username = getUrlParams.getPramsByString(
  window.location.search,
  "username"
);
logined_username.innerHTML = '欢迎您,' + username;

// 初始化页面
initUploadedImgs();

logoutBtn.addEventListener("click", () => {
  const xhr = new XMLHttpRequest();
  xhr.open("get", "/logout");
  xhr.onload = () => {
    console.log(xhr.response);
    const { state } = JSON.parse(xhr.response);
    console.log(state);
    if(state == 1){
      window.location = '/login';
    }
  };
  xhr.send();
});

closeSpan.addEventListener("click", function () {
  changeElementDisplayStyle(masking, "none");
});

// 回显
async function initUploadedImgs() {
  // TODO: check uses who has loginned.
  const result = await getAllPhotos(username);
  console.log(result);
  if (result.length == 0) {
    alert("你还未登录，请登录");
    window.location = "/login";
    return;
  }
  initImg(result);
}

function initImg(result) {
    if(!result[0].imgUrl){
      return ;
    }
    createImg(result);
}


myBtn.addEventListener("click", function () {
  changeElementDisplayStyle(masking, "block");
});

let uploadImgList = [];
uploadBtn.addEventListener("click", async () => {
  // 上传图片到服务器

  // forEach 不等待 await
  // uploadImgList.forEach(async (previewImg) => {
  //   await upload(previewImg);
  // });

  for (const previewImg of uploadImgList) {
    await upload(username, previewImg);
  }

  // 上传完成了
  uploadCompleted();
});


function createImg(result) {
  photoContainer.innerHTML = "";
  result.forEach((obj) => {
    new InitImg(obj.imgUrl);
  });
}

function changeElementDisplayStyle(element, display) {
  element.style.display = display;
}

function uploadCompleted() {
  reset();
}

function reset() {
  hideLoadContainer();
  uploadImgList = [];
  document.querySelector(".wantUpload").innerHTML = ``;
  initUploadedImgs();
}

imgFileAdd.addEventListener("change", (e) => {
  renderPreviewImg(e.target.files);
});

imgFile.addEventListener("change", (e) => {
  renderPreviewImg(e.target.files);
});

function renderPreviewImg(files) {
  const fileList = Array.from(files);

  fileList.forEach((file) => {
    const previewImg = new PreviewImg(file);
    uploadImgList.push(previewImg);
  });

  showLoadContainer();
}

function showLoadContainer() {
  changeElementDisplayStyle(showContainer, "none");
  changeElementDisplayStyle(loadContainer, "block");
}

function hideLoadContainer() {
  changeElementDisplayStyle(showContainer, "block");
  changeElementDisplayStyle(loadContainer, "none");
}
