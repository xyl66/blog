# Tree-shaking

## Tree-shaking的本质
tree-shaking的本质是消除无用的js代码。和传统的dead code elimination（DCE）区别为传统DCE消除不可能执行的代码，tree-shaking更关注消除没有用到的代码。

通过ES Module的特性可以进行静态分析的特点，在编译时进行静态分析导入导出关系，识别出无用代码进行剔除
`ES Module特性`
- import只能作为顶层语句出现
- import的模块名只能是字符串常量
- import不可变的

## webpack中Tree-shaking流程
启动 Tree Shaking 功能必须同时满足三个条件
- 使用 ESM 规范编写模块代码

- 配置 optimization.usedExports 为 true，启动标记功能

- 启动代码优化功能，可以通过如下方式实现：
  - 配置 mode = production
  - 配置 optimization.minimize = true
  - 提供 optimization.minimizer 数组

### 整体流程
  1. 收集模块导出
    1.1 将模块的所有 ESM 导出语句转换为 `Dependency`对象，并记录到 `module` 对象的 `dependencies` 集合
    1.2 触发`finishModules`钩子，执行 `FlagDependencyExportsPlugin` 插件回调。从 `entry` 开始读取 `ModuleGraph` 中存储的模块信息，遍历所有 `module` 对象。遍历 `module` 对象的 `dependencies` 数组。将其转换为 `ExportInfo` 对象并记录到 `ModuleGraph` 体系中
  2. 标记模块导出
    2.1 出发 `optimizeDependencies` 钩子，执行 `FlagDependencyUsagePlugin` 。从 `entry` 开始逐步遍历 `ModuleGraph` 存储的所有 `module` 对象
    2.2 遍历 `module` 对象对应的 `exportInfo` 数组
    2.3 `exportInfo` 对象执行 `compilation.getDependencyReferencedExports` 方法，确定其对应的 `dependency` 对象有否被其它模块使用
    2.4 被使用的导出值，调用 `exportInfo.setUsedConditionally` 方法将其标记为已被使用
    2.5 `exportInfo._usedInRuntime` 属性，记录该导出被如何使用
  3. 生成代码
    `Webpack` 根据 `ModuleGraph` 体系中记录的导出值使用情况生成不同的代码
  4. 删除无用代码
    由 `Terser`、`UglifyJS` 等工具“摇”掉这部分无效代码

## Rollup中Tree-shaking流程
无需额外配置，只要代码符合`ES Module`规范，即可实现tree-shaking。
- 基于ES6模块的静态分析
- 分析程序流，判断哪些变量被使用、引用

分析程序流
基于作用域，在AST时对韩素或全局对象进行对象记录，然后在形成的整个作用域链对象中进行匹配import的导入并标识起来，最后打包匹配的代码，删除未匹配的

### 整体流程
从入口文件出发，找出所有读取的变量，找这些变量在哪里定义的，将定义语句包含进来，无关代码抛弃。

## 副作用以及Babel
一个函数会、或者可能会对函数外部变量产生影响的行为，会产生副作用。
`Babel` 将 `ES6/ES7` 代码进行转换时，可能会使原本没有副作用的代码，产生副作用,进而无法进行 `tree shaking`。
