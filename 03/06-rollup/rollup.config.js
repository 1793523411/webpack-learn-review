// export default {
//   input: "src/index.js",
//   output: {
//     file: "dist/bundle.js",
//     format: "es", // 输出格式
//   },
// };

// import json from '@rollup/plugin-json'
// import resolve from '@rollup/plugin-node-resolve'
// const formats = ["es", "amd", "cjs", "iife", "umd", "system"];
// export default formats.map((format) => ({
//   input: "src/index.js",
//   output: {
//     file: `dist/bundle.${format}.js`,
//     format,
//   },
//   plugins:[
//       json(),
//       resolve()
//   ]
// }));

// import json from "@rollup/plugin-json";
// import resolve from "@rollup/plugin-node-resolve";
// import cjs from '@rollup/plugin-commonjs'
// export default {
//   input: "src/index.js",
//   output: {
//     file: "dist/bundle.js",
//     format: "es",
//   },
//   plugins: [json(), resolve(),cjs()],
// };


export default  {
    input :'src/index.js',
    output:{
        dir:'dist',
        format:'amd'
    }
}