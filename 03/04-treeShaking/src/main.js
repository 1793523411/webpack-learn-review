// import { Button,Link } from "./components.js";

// document.createElement(Button())
// document.createElement(Link())

//上面bundle 1-3
import { Button } from './component'

document.body.appendChild(Button())

// 虽然我们在这里只是希望载入 Button 模块，但实际上载入的是 components/index.js，而 index.js 中又载入了这个目录中全部的组件模块，这就会导致所有组件模块都会被加载执行