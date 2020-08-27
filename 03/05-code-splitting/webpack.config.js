const HtmlWebpackPlugin = require("html-webpack-plugin");

/**@type {import('webpack').Configuration} */
module.exports = {
  entry: {
    index: "./src/index.js",
    album: "./src/album.js",
  },
  output: {
    filename: "[name].bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  optimization: {
      splitChunks:{
          chunks:'all'
      }
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Multi Entry",
      template: "./src/index.html",
      filename: "index.html",
      chunks: ["index"], // 指定使用 index.bundle.js
    }),
    new HtmlWebpackPlugin({
      title: "Multi Entry",
      template: "./src/album.html",
      filename: "album.html",
      chunks: ["album"], // 指定使用 album.bundle.js
    }),
  ],
};
