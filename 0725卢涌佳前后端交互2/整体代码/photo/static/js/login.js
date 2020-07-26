// 登录逻辑

const username = document.querySelector("#username");
const password = document.querySelector("#password");
const loginBtn = document.querySelector(".loginStyle");

loginBtn.addEventListener("click", () => {
  const postData = new FormData();
  postData.append("username", username.value);
  postData.append("password", password.value);

  const xhr = new XMLHttpRequest();
  xhr.open("post", "/checkUser", true);
  xhr.onload = () => {
    const result = JSON.parse(xhr.response);
    console.log(result);
    if (result.state == 0) {
      alert(`账号或者密码错误，详细信息:${result.msg}`);
    } else {
      // localstorage存入token
      localStorage.setItem('token',result.data.token);
      window.location = "/photo";
    }
  };
  xhr.send(postData);
});
