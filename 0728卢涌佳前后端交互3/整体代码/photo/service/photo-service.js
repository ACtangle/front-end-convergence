const moment = require("moment");
const path = require("path");
const fs = require("fs");

const { userImgModel,usersModel } = require("../model/index");

let uploadPath = "";
module.exports = {
  async upload(username, img) {
    const currentTime = getCurrentTime();
    // rename
    const imgName = renameImg(img);
    // 保存到本地
    saveImg(img, imgName);
    // 入库
    console.log('upload', username);
    const user = await usersModel.selectByUserObject({username});
    // console.log('user: ----- ',user);
    // console.log(user[0][0].id);
    if (user) {
      const result = await userImgModel.create(
        user[0][0].id,
        "/upload/" + imgName,
        currentTime
      );
      console.log('userImgModel.create',result);
      return result;
    }
  },
  async getPhotos(username) {
    return await userImgModel.getPhotos(username);
  },
  // async selectByUsername(username, password) {
  //   return await usersModel.selectByUsername(username, password);
  // },
};

function saveImg(img, imgName) {
  uploadPath = path.resolve(__dirname, "../static/upload", imgName);
  const readeStream = fs.createReadStream(img.path);
  const writeStream = fs.createWriteStream(uploadPath);
  readeStream.pipe(writeStream);
}

function renameImg(img) {
  return Date.now() + "_" + img.name;
}

function getCurrentTime() {
  const createTime = moment().format("YYYY-MM-DD hh:mm:ss");
  return createTime;
}
