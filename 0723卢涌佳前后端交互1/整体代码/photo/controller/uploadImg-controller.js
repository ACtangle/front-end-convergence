const { uploadImgService } = require("../service/index");


module.exports = {
  async upload(ctx) {
    const { img } = ctx.request.files;
    const { username } = ctx.request.body;
    console.log(username);
    await uploadImgService.upload(username,img);
    ctx.body = "上传成功";
  },
  async getPhotos(ctx) {
    const { username } = ctx.request.body;
    const [result] = await uploadImgService.getPhotos(username);
    // console.log('result:',result);
    ctx.type = "application/json";
    ctx.body = result;
  },
  async login(ctx) {
    console.log(ctx.request.body);
    ctx.type = "application/json";
    const { username, password } = ctx.request.body;
    const [result] = await uploadImgService.selectByUsername(
      username,
      password
    );
    if(result) {
      ctx.session.userState = true;
      // console.log('666',ctx.session);
      ctx.session.username = username;
    }
    ctx.body = result;
  },
  async logout(ctx) {
    ctx.session.username = '';
    ctx.body = {
      state: 1
    };
  }
};
