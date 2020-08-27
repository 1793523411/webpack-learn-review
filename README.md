# 学习+复习 webpack

## webpack 解决了什么问题

- Webpack 最初的目标就是实现前端项目的模块化
- 开发一个项目理想的方式应该是在页面中引入一个 JS 入口文件，其余用到的模块可以通过代码控制，按需加载进来
- 经过 5 年的迭代， ES Modules 已发展成为现今最主流的前端模块化标准
- 模块化可以帮助我们更好地解决复杂应用开发过程中的代码组织问题，但是随着模块化思想的引入，我们的前端应用又会产生了一些新的问题，webpack 解决了这些问题
  - 首先，我们所使用的 ES Modules 模块系统本身就存在环境兼容问题。尽管现如今主流浏览器的最新版本都支持这一特性，但是目前还无法保证用户的浏览器使用情况。所以我们还需要解决兼容问题。
  - 其次，模块化的方式划分出来的模块文件过多，而前端应用又运行在浏览器中，每一个文件都需要单独从服务器请求回来。零散的模块文件必然会导致浏览器的频繁发送网络请求，影响应用的工作效率。
  - 最后，谈一下在实现 JS 模块化的基础上的发散。随着应用日益复杂，在前端应用开发过程中不仅仅只有 JavaScript 代码需要模块化，HTML 和 CSS 这些资源文件也会面临需要被模块化的问题。而且从宏观角度来看，这些文件也都应该看作前端应用中的一个模块，只不过这些模块的种类和用途跟 JavaScript 不同。
- webpack 相对于其他打包工具解决了：需要支持不同种类的前端模块类型，也就是说可以将开发过程中涉及的样式、图片、字体等所有资源文件都作为模块使用，这样我们就拥有了一个统一的模块化方案，所有资源文件的加载都可以通过代码控制，与业务代码统一维护，更为合理
- 我们可以把 Webpack 看作现代化前端应用的“管家”，这个“管家”所践行的核心理论就是“模块化”，也就是说 Webpack 以模块化思想为核心，帮助开发者更好的管理整个前端工程

## 使用 webpack 实现模块化打包

- 安装 webpack 相关的 npm 包，然后使用 webpack-cli 所提供的命令行工具进行打包，也可以直接使用 npx，Webpack 4 以后的版本支持零配置的方式直接启动打包，整个过程会按照约定将 src/index.js 作为打包入口，最终打包的结果会存放到 dist/main.js 中
- webpack.config.js 是一个运行在 Node.js 环境中的 JS 文件，也就是说我们需要按照 CommonJS 的方式编写代码，这个文件可以导出一个对象，我们可以通过所导出对象的属性完成相应的配置选项
- 在 vscode 中，让配置文件支持智能提示，加入`import { Configuration } from 'webpack'`或`/** @type {import('webpack').Configuration} */`,后者的加入位置要在所有导入模块之后，前者打包时要注释掉，因为 node 不支持 es 方式导入，这种导入类型的方式并不是 ES Modules 中的 Dynamic Imports，而是 TypeScript 中提供特性。虽然我们这里只是一个 JavaScript 文件，但是在 VSCode 中的类型系统都是基于 TypeScript 的，所以可以直接按照这种方式使用
- Webpack 4 新增了一个工作模式的用法，这种用法大大简化了 Webpack 配置的复杂程度
  - production 模式下，启动内置优化插件，自动优化打包结果，打包速度偏慢；（默认模式）
  - development 模式下，自动优化打包速度，添加一些调试过程中的辅助插件；
  - none 模式下，运行最原始的打包，不做任何额外处理。
- 分析打包过后的结果使用 none 模式

## loader 实现特殊资源加载

- 常用 loader，例如加载 css 的 loader，在这里打包后会被打包到最后的 js 文件中
- 自己写一个简单的 loader
- 参照代码部分
- Loader 机制是 Webpack 最核心的机制，因为正是有了 Loader 机制，Webpack 才能足以支撑整个前端项目模块化的大梁，实现通过 Webpack 去加载任何你想要加载的资源，换个角度来说，也正是有了 Loader 这种扩展机制，社区才能不断地为 Webpack 添砖加瓦，形成今天 Webpack 在前端工程化中不可撼动的地位
- Webpack 中实现的这种 “万物皆模块” 的理念值得我们深入思考。因为它确实打破了“在页面中引入各种资源”的这种传统的固化思维，让我们可以在业务代码中载入所需的一切资源，在真正意义上让 JavaScript 驱动一切。如果你之前饱受资源维护的痛苦，那这种方式一定值得尝试

## plugin 横向扩展 webpack 的构建能力

- 常用 plugin，例如 clean-webpack-plugin，html-webpack-plugin，copy-webpack-plugin，对于每个 plugin 更详细的用法还需参考文档
- 自己开发一个简单的 plugin，Webpack 的插件机制就是我们在软件开发中最常见的钩子机制。
- 参照代码部分
- Webpack 为每一个工作环节都预留了合适的钩子，我们在扩展时只需要找到合适的时机去做合适的事情就可以了
- 这种钩子机制又叫作面向切面编程（AOP），是软件工程中实现插件机制最常见的方式，如果你在以后的开发工作中有类似的需求，那钩子机制一定是最好的选择。而且对于使用 JavaScript 的开发者而言，实现面向切面编程其实也很容易，很多时候我们都会采用事件机制去实现这种编程模式

## 有关 webpack 运行机制和工作原理

- Webpack 启动后，会根据我们的配置，找到项目中的某个指定文件（一般这个文件都会是一个 JS 文件）作为入口。然后顺着入口文件中的代码，根据代码中出现的 import（ES Modules）或者是 require（CommonJS）之类的语句，解析推断出来这个文件所依赖的资源模块，然后再分别去解析每个资源模块的依赖，周而复始，最后形成整个项目中所有用到的文件之间的依赖关系树，有了这个依赖关系树过后， Webpack 会遍历（递归）这个依赖树，找到每个节点对应的资源文件，然后根据配置选项中的 Loader 配置，交给对应的 Loader 去加载这个模块，最后将加载的结果放入 bundle.js（打包结果）中，从而实现整个项目的打包，对于依赖模块中无法通过 JavaScript 代码表示的资源模块，例如图片或字体文件，一般的 Loader 会将它们单独作为资源文件拷贝到输出目录中，然后将这个资源文件所对应的访问路径作为这个模块的导出成员暴露给外部，整个打包过程中，Loader 机制起了很重要的作用，因为如果没有 Loader 的话，Webpack 就无法实现各种各样类型的资源文件加载，那 Webpack 也就只能算是一个用来合并 JS 模块代码的工具了
- Webpack 核心工作过程中的关键环节
  - Webpack CLI 启动打包流程；
  - 载入 Webpack 核心模块，创建 Compiler 对象；
  - 使用 Compiler 对象开始编译整个项目；
  - 从入口文件开始，解析模块依赖，形成依赖关系树；
  - 递归依赖树，将每个模块交给对应的 Loader 处理；
  - 合并 Loader 处理完的结果，将打包结果输出到 dist 目录。

## DevServer 提高开发体验

- 使用 Webpack CLI 提供的 watch 工作模式来解决，在这种模式下，Webpack 完成初次构建过后，项目中的源文件会被监视，一旦发生任何改动，Webpack 都会自动重新运行打包任务，我们还可以再开启另外一个命令行终端，同时以 HTTP 形式运行我们的应用，然后打开浏览器去预览应用，此时我们的开发体验就是：修改代码 → Webpack 自动打包 → 手动刷新浏览器 → 预览运行结果
- 如果浏览器能够在 Webpack 打包过后自动刷新，那我们的开发体验将会更好一些，我们就可以使用 BrowserSync 工具替换 serve 工具，启动 HTTP 服务，还需要同时监听 dist 目录下文件的变化，这时浏览器就会自动刷新
- 这种 watch 模式 + BrowserSync 虽然也实现了我们的需求，但是这种方法有很多弊端：操作烦琐，我们需要同时使用两个工具，那么需要了解的内容就会更多，学习成本大大提高；效率低下，因为整个过程中， Webpack 会将文件写入磁盘，BrowserSync 再进行读取。过程中涉及大量磁盘读写操作，必然会导致效率低下
- webpack-dev-server 是 Webpack 官方推出的一款开发工具，根据它的名字我们就应该知道，它提供了一个开发服务器，并且将自动编译和自动刷新浏览器等一系列对开发友好的功能全部集成在了一起，它是一个高度集成的工具，使用起来十分的方便
- 自动刷新：iframe 模式，使用这个模式不需要任何的配置，但需要改变页面的访问路径，比如要访问根目录下的首页，源链接是 http://localhost:8080/index.html 需要换成http://localhost:8080/webpack-dev-server/index.html 。访问这个连接时，查看页面的 dom 结构，发现页面是嵌入到一个 iframe 中显示的
- 可以结合 html-webpack-plugin 这个插件一起使用，此时会在内存中（dist 目录下，内存中的）创建一个 html 文件
- webpack-dev-server 可以在 webpack 配置文件中配置，也可以在启动时通过命令行参数配置
- 跨域请求问题：并不是每种情况下服务端的 API 都支持 CORS。如果前后端应用是同源部署，也就是协议 / 域名 / 端口一致，那这种情况下，根本没必要开启 CORS，所以跨域请求的问题仍然是不可避免的，解决这种开发阶段跨域请求问题最好的办法，就是在开发服务器中配置一个后端 API 的代理服务，也就是把后端接口服务代理到本地的开发服务地址
- 配置了 target 以后，我们请求 http://localhost:8080/api/users ，就相当于请求了 https://api.github.com/api/users,而我们真正希望请求的地址是 https://api.github.com/users，所以对于代理路径开头的 /api 我们要重写掉。我们可以添加一个 pathRewrite 属性来实现代理路径重写，重写规则就是把路径中开头的 /api 替换为空，pathRewrite 最终会以正则的方式来替换请求路径；除此之外，我们还需设置一个 changeOrigin 属性为 true。这是因为默认代理服务器会以我们实际在浏览器中请求的主机名，也就是 localhost:8080 作为代理请求中的主机名。而一般服务器需要根据请求的主机名判断是哪个网站的请求，那 localhost:8080 这个主机名，对于 GitHub 的服务器来说，肯定无法正常请求，所以需要修改，将代理规则配置的 changeOrigin 属性设置为 true，就会以实际代理请求地址中的主机名去请求，也就是我们正常请求这个地址的主机名是什么，实际请求 GitHub 时就会设置成什么

## Webpack SourceMap 最佳实践

- Source Map（源代码地图）:映射转换后的代码与源代码之间的关系。一段转换后的代码，通过转换过程中生成的 Source Map 文件就可以逆向解析得到对应的源代码
- jquery.min.js 中加入 map 的注释`//# sourceMappingURL=jquery-3.4.1.min.map`，实现在 chrom 控制台直接看到转换以前 jQuery.js，页面引入的是 jQuery 的压缩文件
- 因为现阶段 Webpack 支持的 Source Map 模式有很多种。每种模式下所生成的 Source Map 效果和生成速度都不一样。显然，效果好的一般生成速度会比较慢，而生成速度快的一般就没有什么效果,通过初次构建速度、监视模式重新构建速度、是否适合生成环境使用，以及 Source Map 的质量，这四个维度去横向对比不同的 Source Map 模式之间的差异
- Eval 模式:在 eval 函数执行的字符串代码中添加一个注释，注释的格式：# sourceURL=./path/to/file.js，这样的话这段代码就会执行在指定路径下,在 eval 模式下并不会生成 Source Map 文件，所以它的构建速度最快，但是缺点同样明显：它只能定位源代码的文件路径，无法知道具体的行列信息
- inline-source-map 模式:它跟普通的 source-map 效果相同，只不过这种模式下 Source Map 文件不是以物理文件存在，而是以 data URLs 的方式出现在代码中。我们前面遇到的 eval-source-map 也是这种 inline 的方式。
- hidden-source-map 模式:在这个模式下，我们在开发工具中看不到 Source Map 的效果，但是它也确实生成了 Source Map 文件，这就跟 jQuery 一样，虽然生成了 Source Map 文件，但是代码中并没有引用对应的 Source Map 文件，开发者可以自己选择使用。
- nosources-source-map 模式：在这个模式下，我们能看到错误出现的位置（包含行列位置），但是点进去却看不到源代码。这是为了保护源代码在生产环境中不暴露。
- 理解这些模式之间的差异的目的，就是为了可以在不同环境中快速选择一个合适的模式，而不是寻求一个通用法则，开发行业也根本不会有绝对的通用法则！
- Source Map 并不是 Webpack 特有的功能，它们两者的关系只是：Webpack 支持 Source Map

## HRM 机制(模块支持热替换)

- 前面使用时用的 webpack-dev-server 会自动刷新，但刷新的是整个页面，比如我想调整一些动态的样式，那么每次改完代码，整个页面都重新刷新回到初始状态，久而久之，就觉得这个功能有些鸡肋，更好的办法自然是能够实现在页面不刷新的情况下，代码也可以及时的更新到浏览器的页面中，重新执行，避免页面状态丢失。针对这个需求，Webpack 同样可以满足
- HMR 全称 Hot Module Replacement，翻译过来叫作“模块热替换”或“模块热更新”,HMR 可以算是 Webpack 中最为强大的特性之一，而且也是最受欢迎的特性，因为它确实极大程度地提高了开发者的工作效率
- Webpack 中的模块热替换，指的是我们可以在应用运行过程中，实时的去替换掉应用中的某个模块，而应用的运行状态不会因此而改变。例如，我们在应用运行过程中修改了某个模块，通过自动刷新会导致整个应用的整体刷新，那页面中的状态信息都会丢失；而如果使用的是 HMR，就可以实现只将修改的模块实时替换至应用中，不必完全刷新整个应用
- 开启 HRM：一种方法是命令行加 hot 参数；还有就是写入到配置文件中
- HMR 并不像 Webpack 的其他特性一样可以开箱即用，需要有一些额外的操作,具体来说，Webpack 中的 HMR 需要我们手动通过代码去处理，当模块更新过后该，如何把更新后的模块替换到页面中,样式文件是经过 Loader 处理的，在 style-loader 中就已经自动处理了样式文件的热更新，所以就不需要我们额外手动去处理了,我们所编写的 JavaScript 模块是没有任何规律的，你可能导出的是一个对象，也可能导出的是一个字符串，还可能导出的是一个函数，使用时也各不相同。所以 Webpack 面对这些毫无规律的 JS 模块，根本不知道该怎么处理更新后的模块，也就无法直接实现一个可以通用所有情况的模块替换方案,这就是为什么样式文件可以直接热更新，而 JS 文件更新后页面还是回退到自动刷新的原因
- **我们还是需要自己手动通过代码来处理，当 JavaScript 模块更新过后，该如何将更新后的模块替换到页面中？**
- HMR 过程报错导致 HMR 失败，HMR 失败过后，会自动回退到自动刷新，页面一旦自动刷新，控制台中的错误信息就会被清除，这样的话，如果不是很明显的错误，就很难被发现,在这种情况下，我们可以使用 hotOnly 的方式来解决，因为现在使用的 hot 方式，如果热替换失败就会自动回退使用自动刷新，而 hotOnly 的情况下并不会使用自动刷新,配置完成以后，重新启动 webpack-dev-server。此时我们再去修改代码，无论是否处理了这个代码模块的热替换逻辑，浏览器都不会自动刷新了，这样的话，热替换逻辑中的错误信息就可以直接看到了
- 我们在代码中写了很多与业务功能本身无关的代码，不会对生产环境有影响,在bundle.js中我们编写的处理热替换的代码会被移除掉了，只剩下一个 if (false) 的空判断，这种没有意义的判断，在压缩过后也会自动去掉，所以根本不会对生产环境有任何影响

## 高级特性项目优化：Tree Shaking 和sideEffectss

+ Tree Shaking 翻译过来的意思就是“摇树”。伴随着摇树的动作，树上的枯树枝和树叶就会掉落下来，这里要介绍的 Tree-shaking 也是同样的道理，不过通过 Tree-shaking “摇掉”的是代码中那些没有用到的部分，这部分没有用的代码更专业的说法应该叫作未引用代码（dead-code），Tree-shaking 最早是 Rollup 中推出的一个特性，Webpack 从 2.0 过后开始支持这个特性
+ Webpack 的 Tree-shaking 特性在生产模式下会自动开启,我们在项目中引入 Lodash 这种工具库，大部分情况下我们只会使用其中的某几个工具函数，而其他没有用到的部分就是冗余代码。通过 Tree-shaking 就可以极大地减少最终打包后 bundle 的体积,Tree-shaking 并不是指 Webpack 中的某一个配置选项，而是一组功能搭配使用过后实现的效果，这组功能在生产模式下都会自动启用，所以使用生产模式打包就会有 Tree-shaking 的效果
+ usedExports - 标记树上哪些是枯树枝、枯树叶,打包结果中只导出外部用到的成员,minimize - 负责把枯树枝、枯树叶摇下来,压缩打包结果。
+ 除了 usedExports 选项之外，我们还可以使用一个 concatenateModules 选项继续优化输出,普通打包只是将一个模块最终放入一个单独的函数中，如果我们的模块很多，就意味着在输出结果中会有很多的模块函数,concatenateModules 配置的作用就是尽可能将所有模块合并到一起输出到一个函数中，这样既提升了运行效率，又减少了代码的体积,这个特性又被称为 Scope Hoisting，也就是作用域提升，它是 Webpack 3.0 中添加的一个特性。如果再配合 minimize 选项，打包结果的体积又会减小很多
+ 结合 babel-loader 让摇树不生效的问题的问题:Tree-shaking 实现的前提是 ES Modules，也就是说：最终交给 Webpack 打包的代码，必须是使用 ES Modules 的方式来组织的模块化
+ >我们都知道 Webpack 在打包所有的模块代码之前，先是将模块根据配置交给不同的 Loader 处理，最后再将 Loader 处理的结果打包到一起。很多时候，我们为了更好的兼容性，会选择使用 babel-loader 去转换我们源代码中的一些 ECMAScript 的新特性。而 Babel 在转换 JS 代码时，很有可能处理掉我们代码中的 ES Modules 部分，把它们转换成 CommonJS 的方式,当然了，Babel 具体会不会处理 ES Modules 代码，取决于我们有没有为它配置使用转换 ES Modules 的插件,很多时候，我们为 Babel 配置的都是一个 preset（预设插件集合），而不是某些具体的插件。例如，目前市面上使用最多的 @babel/preset-env，这个预设里面就有转换 ES Modules 的插件。所以当我们使用这个预设时，代码中的 ES Modules 部分就会被转换成 CommonJS 方式。那 Webpack 再去打包时，拿到的就是以 CommonJS 方式组织的代码了，所以 Tree-shaking 不能生效
+ 很多资料都说 babel-loader 会导致 Tree-shaking 失效，但当我们实际尝试后又发现并没有失效,这是因为在最新版本（8.x）的 babel-loader 中，已经自动帮我们关闭了对 ES Modules 转换的插件，你可以参考对应版本 babel-loader 的源码，如果你不确定现在使用的 babel-loader 会不会导致这个问题，最简单的办法就是在配置中将 @babel/preset-env 的 modules 属性设置为 false，确保不会转换 ES Modules，也就确保了 Tree-shaking 的前提
+ Webpack 4 中新增了一个 sideEffects 特性，它允许我们通过配置标识我们的代码是否有副作用，从而提供更大的压缩空间，模块的副作用指的就是模块执行的时候除了导出成员，是否还做了其他的事情。这个特性一般只有我们去开发一个 npm 模块时才会用到。因为官网把对 sideEffects 特性的介绍跟 Tree-shaking 混到了一起，所以很多人误认为它们之间是因果关系，其实它们没有什么太大的关系
+ Tree-shaking 只能移除没有用到的代码成员，而想要完整移除没有用到的模块，那就需要开启 sideEffects 特性了,注意这个特性在 production 模式下同样会自动开启。
+ 前很多第三方的库或者框架都已经使用了 sideEffects 标识，所以我们再也不用担心为了一个小功能引入一个很大体积的库了。例如，某个 UI 组件库中只有一两个组件会用到，那只要它支持 sideEffects，你就可以放心大胆的直接用了
+ 使用 sideEffects 这个功能的前提是确定你的代码没有副作用，或者副作用代码没有全局影响，否则打包时就会误删掉你那些有意义的副作用代码,所以说不是所有的副作用都应该被移除，有一些必要的副作用需要保留下来,最好的办法就是在 package.json 中的 sideEffects 字段中标识需要保留副作用的模块路径（可以使用通配符）
+ 对全局有影响的副作用代码不能移除，而只是对模块有影响的副作用代码就可以移除
+ 不管是 Tree-shaking 还是 sideEffects都是为了弥补 JavaScript 早期在模块系统设计上的不足。随着 Webpack 这类技术的发展，JavaScript 的模块化确实越来越好用，也越来越合理
+ 当你对这些特性有了一定的了解之后，就应该意识到：尽可能不要写影响全局的副作用代码

## Code Splitting（分块打包）

+ All in One 的方式并不合理，更为合理的方案是把打包的结果按照一定的规则分离到多个 bundle 中，然后根据应用的运行需要按需加载。这样就可以降低启动成本，提高响应速度
+ Code Splitting 通过把项目中的资源模块按照我们设计的规则打包到不同的 bundle 中，从而降低应用的启动成本，提高响应速度
+ Webpack 实现分包的方式主要有两种：根据业务不同配置多个打包入口，输出多个打包结果；结合 ES Modules 的动态导入（Dynamic Imports）特性，按需加载模块。
+ 多入口打包一般适用于传统的多页应用程序，最常见的划分规则就是一个页面对应一个打包入口，对于不同页面间公用的部分，再提取到公共的结果中
+ 除了多入口打包的方式，Code Splitting 更常见的实现方式还是结合 ES Modules 的动态导入特性，从而实现按需加载
+ Webpack 中支持使用动态导入的方式实现模块的按需加载，而且所有动态导入的模块都会被自动提取到单独的 bundle 中，从而实现分包,相比于多入口的方式，动态导入更为灵活，因为我们可以通过代码中的逻辑去控制需不需要加载某个模块，或者什么时候加载某个模块。而且我们分包的目的中，很重要的一点就是让模块实现按需加载，从而提高应用的响应速度
+ 整个过程我们无需额外配置任何地方，只需要按照 ES Modules 动态导入的方式去导入模块就可以了，Webpack 内部会自动处理分包和按需加载
+ 默认通过动态导入产生的 bundle 文件，它的 name 就是一个序号，这并没有什么不好，因为大多数时候，在生产环境中我们根本不用关心资源文件的名称,但是如果你还是需要给这些 bundle 命名的话，就可以使用 Webpack 所特有的魔法注释去实现
+ 所谓魔法注释，就是在 import 函数的形式参数位置，添加一个行内注释，这个注释有一个特定的格式：webpackChunkName: ''，这样就可以给分包的 chunk 起名字了,魔法注释还有个特殊用途：如果你的 chunkName 相同的话，那相同的 chunkName 最终就会被打包到一起

## 优化webpack构建速度和打包结果

+ 为不同的工作环境创建不同的 Webpack 配置。创建不同环境配置的方式主要有两种：在配置文件中添加相应的判断条件，根据环境不同导出不同配置；为不同环境单独添加一个配置文件，一个环境对应一个配置文件
+ Webpack 配置文件还支持导出一个函数，然后在函数中返回所需要的配置对象。这个函数可以接收两个参数，第一个是 env，是我们通过 CLI 传递的环境名参数，第二个是 argv，是运行 CLI 过程中的所有参数
+ 通过判断环境名参数返回不同配置对象的方式只适用于中小型项目，因为一旦项目变得复杂，我们的配置也会一起变得复杂起来。所以对于大型的项目来说，还是建议使用不同环境对应不同配置文件的方式来实现，一般在这种方式下，项目中最少会有三个 webpack 的配置文件。其中两个用来分别适配开发环境和生产环境，另外一个则是公共配置。因为开发环境和生产环境的配置并不是完全不同的，所以需要一个公共文件来抽象两者相同的配置
+ 在 Webpack 4 中新增的 production 模式下，内部就自动开启了很多通用的优化功能。对于使用者而言，开箱即用是非常方便的，但是对于学习者而言，这种开箱即用会导致我们忽略掉很多需要了解的东西。以至于出现问题无从下手
+ 首先是 DefinePlugin，DefinePlugin 是用来为我们代码中注入全局成员的。在 production 模式下，默认通过这个插件往代码中注入了一个 process.env.NODE_ENV。很多第三方模块都是通过这个成员去判断运行环境，从而决定是否执行例如打印日志之类的操作，DefinePlugin 的作用虽然简单，但是却非常有用，我们可以用它在代码中注入一些可能变化的值
+ 对于 CSS 文件的打包，一般我们会使用 style-loader 进行处理，这种处理方式最终的打包结果就是 CSS 代码会内嵌到 JS 代码中，mini-css-extract-plugin 是一个可以将 CSS 代码从打包结果中提取出来的插件，Mini CSS Extract Plugin 还需要我们使用 MiniCssExtractPlugin 中提供的 loader 去替换掉 style-loader，以此来捕获到所有的样式，这样的话，打包过后，样式就会存放在独立的文件中，直接通过 link 标签引入页面。
+ Webpack 内置的压缩插件仅仅是针对 JS 文件的压缩，其他资源文件的压缩都需要额外的插件，Webpack 官方推荐了一个 Optimize CSS Assets Webpack Plugin 插件。我们可以使用这个插件来压缩我们的样式文件
+ 如果我们配置到 plugins 属性中，那么这个插件在任何情况下都会工作。而配置到 minimizer 中，就只会在 minimize 特性开启时才工作，所以 Webpack 建议像这种压缩插件，应该我们配置到 minimizer 中，便于 minimize 选项的统一控制，但是这么配置也有个缺点，此时我们再次运行生产模式打包，打包完成后再来看一眼输出的 JS 文件，此时你会发现，原本可以自动压缩的 JS，现在却不能压缩了，那这是因为我们设置了 minimizer，Webpack 认为我们需要使用自定义压缩器插件，那内部的 JS 压缩器就会被覆盖掉。我们必须手动再添加回来，内置的 JS 压缩插件叫作 terser-webpack-plugin，那这样的话，我们再次以生产模式运行打包，JS 文件和 CSS 文件就都可以正常压缩了

## 