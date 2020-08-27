const marked = require("marked");

// module.exports = source => {
//     // 1. 将 markdown 转换为 html 字符串
//     const html = marked(source)
//     // html => '<h1>About</h1><p>this is a markdown file.</p>'
//     // 2. 将 html 字符串拼接为一段导出字符串的 JS 代码
//     // const code = `module.exports = ${JSON.stringify(html)}`
//     const code = `export default ${JSON.stringify(html)}`
//     return code
//     // code => 'export default "<h1>About</h1><p>this is a markdown file.</p>"'
//   }

// 其实 Webpack 加载资源文件的过程类似于一个工作管道，你可以在这个过程中依次使用多个 Loader，但是最终这个管道结束过后的结果必须是一段标准的 JS 代码字符串

// 除了 module.exports 这种方式，Webpack 还允许我们在返回的代码中使用 ES Modules 的方式导出，例如，我们这里将 module.exports 修改为 export default，然后运行打包，结果同样是可以的，Webpack 内部会自动转换 ES Modules 代码


//多个loader配合工作
module.exports = (source) => {
  // 1. 将 markdown 转换为 html 字符串
  const html = marked(source);
  return html;
};
