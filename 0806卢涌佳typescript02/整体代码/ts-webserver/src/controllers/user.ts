import { Post } from "../kkb/index";

export default class UserController {
  @Post("/login")
  public login(ctx) {
    ctx.type = "application/json";
    const { username } = ctx.request.body;
    console.log(ctx.request.body);
    ctx.body = `欢迎${username}kkb登陆`;
  }
}
