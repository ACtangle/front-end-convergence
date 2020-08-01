const path = require("path");

module.exports = {
  //模式
  mode: "development",

  // 单入口
  entry: {
    index: "./src/index.js",
  },

  // 输出
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
  },

  //loader
  module: {
    rules: [
      // url-loader
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              outputPath: "./images",
              publicPath: "../dist/images",
              limit: 100,
            },
          },
        ],
      },

      // css-loader,style-loader
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader",
            options: {},
          },
          {
            loader: "css-loader",
            options: {
              // 启用/禁用 url() 处理
              url: true,
              // 启用/禁用 @import 处理
              import: true,
              // 启用/禁用 Sourcemap
              sourceMap: false,
              
            },
          },
        ],
      },
    ],
  },
};
