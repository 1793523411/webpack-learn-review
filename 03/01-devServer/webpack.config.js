const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/main.js",
  output: {
    filename: "bundle.js",
    path: path.join(__dirname, "dist"),
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
    // hot: true,
    proxy: {
        '/api': {
          target: 'https://api.github.com',
          pathRewrite: {
            '^/api': '' // 替换掉代理地址中的 /api
          },
          changeOrigin: true // 确保请求 GitHub 的主机名就是：api.github.com
        }
    }
  },
  plugins:[
    new HtmlWebpackPlugin({
      filename: "index.html",
    }),
  ]
};

// 详细配置文档：https://webpack.js.org/configuration/dev-server/
