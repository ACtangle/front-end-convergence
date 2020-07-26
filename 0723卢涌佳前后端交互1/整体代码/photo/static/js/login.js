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
    // console.log(xhr.response);
    const result = JSON.parse(xhr.response);
    console.log(result);
    console.log(result[0]);
    if (result.length == 0) {
      alert("用户名或者密码错误");
    } else {
      window.location = "/photo?username=" + username.value;
    }
  };
  xhr.send(postData);
});
