/** @type {import('webpack').Configuration} */

module.exports = [
  {
    entry: "./src/main.js",
    output: {
      filename: "bundle.js",
    },
    optimization: {
      usedExports: true,
      minimize: false,
      concatenateModules: true,
    },
  },
  {
    entry: "./src/main.js",
    output: {
      filename: "bundle2.js",
    },
    optimization: {
      usedExports: true,
      minimize: false,
      concatenateModules: false,
    },
  },
  {
    entry: "./src/main.js",
    output: {
      filename: "bundle3.js",
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          use: {
            loader: "babel-loader",
            options: {
              //{ modules: 'commonjs' }强制开启转换，源码内部关闭了自动转换，我们在这个对象中将 modules 属性设置为 "commonjs"，默认这个属性是 auto，也就是根据环境判断是否开启 ES Modules 插件，我们设置为 commonjs 就表示我们强制使用 Babel 的 ES Modules 插件把代码中的 ES Modules 转换为 CommonJS
              presets: [["@babel/preset-env", { modules: "commonjs" }]],
            },
          },
        },
      ],
    },
    optimization: {
      usedExports: true,
    },
  },
  {
    entry: "./src/main.js",
    output: {
      filename: "bundle4.js",
    },
    optimization:{
        sideEffects: true
    }
  },
];
