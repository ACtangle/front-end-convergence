const http = require("http");
const fs = require("fs");


let html;

const server = http.createServer((req, res) => {
  res.setHeader("content-type", "text/html; charset=utf-8");
  if (req.url === "/index") {
    // 路径拼接
    const result = __dirname + "/index.html";
    // res.end("index");
    // 读取文件
    fs.readFile(result, "utf8", (err, doc) => {
      if (err == null) {
        res.setHeader("content-type", "text/plain; charset=utf-8");
        res.end(doc);
      }
    });
  }

});

server.listen(8080);
