// socket.io
const Koa = require("koa");
const http = require("http");
const serve = require("koa-static");
const users = require("./users");
const moment = require("moment");

const app = new Koa();
app.use(serve("./static"));

const server = http.createServer(app.callback());
const io = require("socket.io")(server);

let userArray = [];
let room = "";

io.on("connection", (socket) => {
  console.log("建立连接");
  socket.on("joinChatRoom", (data) => {
    console.log('xxx'+userArray);
    // 存储了加入聊天的用户
    users.addUser(socket.id, data);
    userArray.push(data.username);
    room = data.room;
    socket.join(room, () => {
      // let rooms = Object.keys(socket.rooms);
      // console.log(rooms);
      userArray = Array.from(new Set(userArray));
      console.log(userArray);
      io.to(room).emit("addUser", userArray);
    });

    // socket.to(room)


    //用户进来的时候
    // 当前用户收到  欢迎加入聊天室
    // 指定 room
    // socket.to(room)
    // 这里是给自己看的
    socket.emit("message", {
      username: "开课吧",
      msg: `欢迎加入[${room}]聊天室`,
      time: moment().format("HH:mm: A"),
    });

    // 其他用户收到  xx 加入聊天室
    const { username } = data;
    // socket.to(room)

    // 广播
    // 这里是给其他已经连接进来的人看的
    socket.broadcast.emit("message", {
      username: "开课吧",
      msg: `${username} 加入[${room}]聊天室`,
      time: moment().format("HH:mm: A"),
    });
  });

  socket.on("disconnect", () => {
    // 通过 id
    const userInfo = users.findUser(socket.id);
    // console.log(userInfo);
    socket.leave(room, () => {
      let index = userArray.findIndex(ele => {
        ele === userInfo.username;
      });
      userArray.splice(index,1);
      io.to(room).emit("addUser", userArray);
    });
    console.log(userArray);

    if (userInfo) {
      const { username } = userInfo;
      // 其他用户收到  xx 离开聊天室
      socket.broadcast.emit("message", {
        username: "开课吧",
        msg: `${username} 离开[${room}]聊天室`,
        time: moment().format("HH:mm: A"),
      });
    }
  });

  socket.on("chatMessage", (data) => {
    console.log(data);

    // 通过 id
    const userInfo = users.findUser(socket.id);

    if (userInfo) {
      const { username } = userInfo;
      // 通知所有的连接用户
      // 获取到用户名
      io.emit("message", {
        username,
        msg: data,
        time: moment().format("HH:mm: A"),
      });
    }
  });
});

server.listen(3000);
