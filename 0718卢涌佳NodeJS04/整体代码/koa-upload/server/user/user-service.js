const { userModel } = require("../../model/index");
const fs = require("fs");
const path = require("path");

module.exports = {
  async upload(username, age, img) {
    // 修改名字
    const imgName = renameImg(img);
    // 保存到本地
    saveImg(img, imgName);
    // 入库
    const result = await userModel.create(
      username,
      age,
      "/upload/" + imgName,
      formatTime()
    );
    return result;
  },
};

function renameImg(img) {
  return Date.now() + "_" + img.name;
}

function saveImg(img, imgName) {
  const uploadPath = path.resolve(__dirname, "../../static/upload", imgName);
  const readStream = fs.createReadStream(img.path);
  const writeStream = fs.createWriteStream(uploadPath);
  readStream.pipe(writeStream);
}

function formatTime() {
  const date = new Date();
  return `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}
