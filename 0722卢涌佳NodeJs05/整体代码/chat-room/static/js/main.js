// 前端逻辑
const socket = io("ws://localhost:3000");
// send
// message -> chatMessage
// socket.emit("chatMessage","client")

// 1. 获取到点击的按钮
const sendBtn = document.querySelector("#sendBtn");
const leaveBtn = document.querySelector("#leaveBtn");
const roomName = document.querySelector("#room-name");

const msgInput = document.querySelector("#msg");
const users = document.querySelector("#users");

const urlSearchParams = new URLSearchParams(location.search);
const username = urlSearchParams.get("username");
const room = urlSearchParams.get("room");
roomName.innerHTML = room;

// 登录
socket.emit("joinChatRoom", {
  username,
  room,
});

let userArray = [];
// 离开
leaveBtn.onclick = () => {
  socket.disconnect();
  window.location = '/index.html';
  return false;
};

sendBtn.onclick = () => {
  console.log(msgInput.value);
  // 把值发送给后端
  socket.emit("chatMessage", msgInput.value);
  msgInput.value = "";
  return false;
};

socket.on("message", (data) => {
  // div
  // 渲染data
  const { msg, username, time } = data;
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("message");
  messageDiv.innerHTML = `<p class="meta">${username}&nbsp;${time}</p><p>${msg}</p>`;

  const container = document.querySelector(".chat-messages");
  container.appendChild(messageDiv);
});

socket.on("addUser", (data) => {
  // console.log(Array.from(new Set(data)));
  let html = "";
  data.forEach((item) => {
    html += `<li>${item}</li>`;
  });
  // console.log(html);
  users.innerHTML = html;
  // console.log(users);
});
