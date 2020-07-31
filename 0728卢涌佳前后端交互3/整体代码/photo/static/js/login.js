// 登录逻辑
import { login } from "./api.js";

// import { login } from "./ajax.js";

const username = document.querySelector("#username");
const password = document.querySelector("#password");
const loginBtn = document.querySelector(".loginStyle");

// loginBtn.addEventListener("click", () => {
//   login(username.value, password.value);
// });

loginBtn.addEventListener("click", async () => {

  const { data } = await login(username.value, password.value);

  if (data.state == 0) {
    alert(`详细信息：${data.msg}`);
  } else if (data.state == 1) {
    localStorage.setItem("token", data.data.token);
    window.location = "photo.html";
  } else {
    window.location = "404.html";
  }
});
