// 登录逻辑
// import { login } from "./ajax.js";
import { login } from "./api.js";

const username = document.querySelector("#username");
const password = document.querySelector("#password");
const loginBtn = document.querySelector(".loginStyle");

loginBtn.addEventListener("click", () => {
  login(username.value, password.value);
});
