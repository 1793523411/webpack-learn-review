const { CleanWebpackPlugin } = require("clean-webpack-plugin");//用exports导出  exports.CleanWebpackPlugin = CleanWebpackPlugin;
const HtmlWebpackPlugin = require("html-webpack-plugin");//用model.exports导出  module.exports = HtmlWebpackPlugin;
const CopyWebpackPlugin = require("copy-webpack-plugin");//用export.default命令导出 var _default = CopyPlugin; exports.default = _default;
const {RemoveCommentsPlugin} = require('./remove-commons-plugin')
//位置要放对
/** @type {import ('webpack').Configuration} */
module.exports = {
  entry: "./src/main.js",
  output: {
    filename: "bundle.js",
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "Webpack plugin Sample",
      // meta:{
      //     viewport: 'width=device-width'
      // }
      template: "./src/index.html",
    }),
    // 用于生成 about.html
    new HtmlWebpackPlugin({
      filename: "about.html",
    }),
    //* 对于同时输出多个 HTML，一般我们还会配合 Webpack 多入口打包的用法，这样就可以让不同的 HTML 使用不同的打包结果
    new CopyWebpackPlugin({
        patterns:['public']
    }),
    new RemoveCommentsPlugin()
  ],
};
