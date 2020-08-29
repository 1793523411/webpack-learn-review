define(['require'], function (require) { 'use strict';

  // log(messages.hi)

  // import { name, version } from "../package.json";
  // console.log(name,version)

  // import { camelCase } from "lodash-es";
  //相比于普通的 lodash，lodash-es 可以更好地支持 Tree-shaking,这里使用 Lodash 的 ESM 版本而不是 Lodash 普通版本的原因是 Rollup 默认只能处理 ESM 模块。如果要使用普通版本则需要额外处理.
  // console.log(camelCase('hello rollup'))

  // import cjs from "./cjs-module";
  // console.log(cjs)

  // 动态导入的模块会自动分包
  new Promise(function (resolve, reject) { require(['./logger-14a3ab9b'], resolve, reject) }).then(({ log }) => {
    log("code splitting~");
  });

});
