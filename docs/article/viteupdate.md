# webpack迁移至vite
> 本文仅记录一下现有项目由webpack迁移到vite踩到的坑，至于vite的优缺点就不在此赘述了。具体可查看[Vite 官方中文文档](https://cn.vitejs.dev/guide/why.html#the-problems)

### 环境
- webpack
- React
- antd3(4)
- 后台管理系统（兼容性要求没那么高）

### 迁移方式
1. 使用[wp2vite](https://www.npmjs.com/package/wp2vite)自动化工具(推荐)
  一键让使用webpack来进行开发和构建的项目支持使用vite来进行开发和构建。它会自动帮你生成入口文件、分析alias生成`viteconfig`配置、以及添加相关依赖修改`package.json`配置等。生产后再按自己需要修改下`viteconfig`配置。
2. 自己手动配置
    - 根目录新增index.html  使用module引入入口文件

      ```js
      <script type="module" src="/src/index.tsx"></script>
      ```
    - 安装相关依赖
    
      ```sh
      yarn add -D vite @vitejs/plugin-legacy vite-plugin-importer @vitejs/plugin-react-refresh @rollup/plugin-babel sass
      ```
    - 配置`package.json`，添加vite相关启动命令

    - 配置`vite.config.js`具体可参照[配置 Vite](https://cn.vitejs.dev/config/),以下为antd3迁移时需要注意的点。因为antd3库本身代码或者其内部依赖的一些问题，例如：虽然vite已经兼容了rollup的`commonjs`插件功能，支持`CommonJS modules`转为`ES6`；但是`es`文件中使用到require，rollup会认为已经是es而不会去做处理；而`esbuild`没这问题。因此我们可以开发时使用`es`文件，生产环境时使用`commonjs`引入让其都去处理一遍。

      ```js
      // @see https://cn.vitejs.dev/config/
      /* antd3需引入start */
      import usePluginImport from 'vite-plugin-importer';
      import requireEsmPlugin from 'rollup-plugin-requiretoimport';
      /* antd3需引入end */
      //+
          usePluginImport({
              libraryName: 'antd', // todo please input your babel-plugin-import config
              libraryDirectory: mode === 'production' ? 'lib' : 'lib',
              style: 'css',
          }),
          requireEsmPlugin(),// antd3需引入    
      //+
      ```


    - 配置`tsconfig.json`
      ```diff
      //- "target": "es5",
       "target": "esnext",

      ```

    - 如果使用了装饰器需引入`@rollup/plugin-babel`处理，不然会出现数据不更新的现象
  
      ```js
          babel({
            extensions: ['.ts', '.tsx'],
            plugins: [
              ['@babel/plugin-proposal-decorators', { legacy: true }],
              ['@babel/plugin-proposal-class-properties', { loose: true }]
            ]
          })
      ```
### 错误处理
1. `[vite] Internal server error: [BABEL] unknown: Using babel-preset-react-app requires that you specify NODE_ENV or  environment variables. Valid values are "development", "test", and "production". Instead, received: undefined.`

    提示是babel的这个react-app预置需要用到NODE_ENV,vite中没这个环境变量了，所以undefined了。那我们就不用这个预置，移除babel.config.json配置中的 presets "react-app"

2. `[vite] Internal server error: Top-level selectors may not contain the parent selector "&".`

    sass语法错误，父选择器需要用在`{}`内；在父选择器外层加上大括号即可
    ```diff
      - .border-1px &::after{
      - }
      + .border-1px {
      +    &::after {
      +    }
      +  }
    ```
3. `启动服务后打开页面发现vite不停connect进行建立连接,这是由于websocket连接建立的不对`

    vite会在客户端注入socket连接代码，连接到本地服务的3000端口，由于我们使用zanproxy代理的原因，已经代理到3000端口，即时在vite的配置项里将hrm这一项配置空字符，vite也会将':'拼接进去，因此需修改vite源码，移除监听端口
    修改`node_modules/vite/dist/client/client.mjs`
    ```diff
    -const socketHost = `${__HMR_HOSTNAME__ || location.hostname}:${__HMR_PORT__}`;
    +const socketHost = `${__HMR_HOSTNAME__ || location.hostname}`;
    ```
4. `ts报错:ts语法提示类型“ImportMeta”上不存在属性“env”时。`

    需要在ts配置项中添加 types": ["vite/client"]
    ```js
    //tsconfig.json
    {
      "compilerOptions": {
        "types": ["vite/client"],
        }
    }
    ```
5. `Uncaught TypeError: Failed to resolve module specifier "indexof". Relative references must start with either "/", "./", or "../".`

    提示无法解析`indexof`模块，应该是没有安装，那我们就安装一下该模块
    ```js
    npm install indexof 
    ```

6. `antd4`中引入`icon`时 通过`antd/lib` 引入时部分页面会在`build`后出现报错。修复方式:不指定lib目录,大致原因就是不指定是会走es文件夹，指定了后lib里可能有隐藏的es、commonjs混用的情况。
    ```js
    /*
    import{
      MinusCircleOutlined,
    } from '@ant-design/icons/lib';
    */
    import{
      MinusCircleOutlined,
    } from '@ant-design/icons';
    ```
  7. mobx-react报错 `node_modules/mobx-react/node_modules/mobx-react-lite/es/utils/assertEnvironment.js:1:9: error: No matching export in "node_modules/mobx/lib/mobx.module.js" for import "makeObservable"`

      原因是`mobx-react-lite` 与`mobx`版本不匹配。*`npm`安装时*，`mobx-react`依赖的`mobx-react-lite>=2.2.0`，项目的`package.json`中依赖`mobx-react-lite`版本为`2.2.2`满足`>=2.2.0`要求，`mobx-react`直接使用外层的`mobx-react-lite`,因此`npm`安装没问题。*`yarn`安装时*，按照`mobx-react-lite>=2.2.0`要求会直接在`mobx-react/node-modules`下安装到最新版本也就是`3.2.1`版本。`3.2.1`版本的`mobx-react-lite`依赖*mobx*`^6.1.0`,而我们的mobx版本为固定的`5.15.4`，缺少`makeObservable`.咋整，尝试升级`mobx`发现会造成其它不可预测影响，只能修改下依赖的源码将`/node_modules/mobx-react/node_modules/mobx-react-lite/es/utils/assertEnvironment.js`文件下的`makeObservable`相关部分注释掉；(可以做成脚本安装完依赖后执行一下修改即可)
      ```js
          //import { makeObservable } from "mobx";
          import { useState } from "react";
          if (!useState) {
              throw new Error("mobx-react-lite requires React with Hooks support");
          }
          // if (!makeObservable) {
          //     throw new Error("mobx-react-lite@3 requires mobx at least version 6 to be available");
          // }
          //# sourceMappingURL=assertEnvironment.js.map
      ```

### antd3需要特殊处理的点

1. `antd3的icons问题`

    因为`@ant-design/icons/lib/dist`是es转换得到的，所有导出都在exports上，不需要`import * as`；但是在`node_modules/antd/es/icon/index.js`我们可以看到其又直接以es方式调用使用了`import * as`，这里转换后会加上default，隐藏后面遍历时就找不到正确的icon注册了。可以通过下面2种方法进行处理
    - 修改`node_modules/antd/es/icon/index.js`

        ```js
        //- import * as allIcons from '@ant-design/icons/lib/dist';
        import allIcons from '@ant-design/icons/lib/dist';
        ```
    - 或者修改配置使用esmodule

      ```js
      // vite.config.js
          //***
            alias: {
              '@ant-design/icons/lib/dist': '@ant-design/icons/lib/index.es.js'
            },
          //***
      ```
2. umi/hooks报错
`'CombineService' is not exported by node_modules/@umijs/use-request/lib/types.js, imported by node_modules/@umijs/hooks/es/useFormTable/index.js`
依赖项代码的bug，去`types.js`里面一看，好家伙，只有`"use strict";`孤零零的一行在那，没有导出项。所以报了没有导出项；新版本`ahook`已经修复了改问题，不过由于这里是antd3的，咱也不能随便升级,只能改`types.js`了。添加如下内容
    ```js
    // path: node_modules/@umijs/use-request/lib/types.js
    Object.defineProperty(exports, "__esModule", {
        value: true
      });
    ```
3. 依赖项中的require兼容

    第三点也是最重要的一点，因antd3中很多依赖项的源码中有es、commonjs混着用的情况，所以运行build时会发现总是报require。当你碰到了在你的项目里发现require引用已经搜不到了，build后还报require错误，不用怀疑肯定是某个依赖库中或者依赖库的依赖库中有不规范的地方。需要写个插件去将require引入转换成import，再让rollup去做后续处理。当然你也可以直接下载这个我写的插件[rollup-plugin-requiretoimport](https://www.npmjs.com/package/rollup-plugin-requiretoimport)直接使用

4. `antd3` `build`从`lib`中引入
  `vite`在`build`时使用的是`rollup`处理的，`rollup`的`commonjs`插件只能将`commonjs`转为`es`，也就是只能处理导出，不会处理`require`导入，为了避免一些其它错误，可以说使用`usePluginImport`设置按需加载在生产环境时从`lib`文件夹获取资源

    


### 注意事项
1. 环境变量`(process.env.REGION)`的问题，我们可以通过[定义常量](https://cn.vitejs.dev/config/#define)的方式进行过渡
    ```js
    // 定义环境变量
    // package.json
      "scripts": {
        "start:vn": "cross-env APP_ENV=test APP_REGION=vn npm run vite-start",
        "start:th": "cross-env APP_ENV=test APP_REGION=th npm run vite-start",
        "vite-start": "vite",
        "vite-build": "cross-env 
      },
    ```
    ```js
    // 将环境变量转换为常量
    // vite.config.js
    
      export default ({ mode })=>{
        const define = {
          'process.env.NODE_ENV': JSON.stringify(mode),
          'process.env.APP_ENV': JSON.stringify(process.env.APP_ENV),
          'process.env.APP_REGION': JSON.stringify(process.env.APP_REGION),
        };
        return {
          define
        }
      }
    ```
    ```js
      // 统一导出
      // @/utils/index.ts
      export const APP_REGION = process.env.APP_REGION || 'th';
      export const APP_ENV = process.env.APP_ENV || 'test';
      export const SENTRY_RELEASE = process.env.SENTRY_RELEASE || 'dev';
    ```
    需注意得是因其只是做静态替换处理，因此不要使用解构`const { APP_REGION = 'vn' } = process.env;`, 为了方便使用由原来的`process.env.REGION`直接使用统一变更为导入使用。

    ```js
    // 使用
    // userComponent.tsx
    import { APP_REGION,APP_ENV } from '@/utils'
    ```
    

2. 不要使用`require`。图片使用`import`导入
    ```js
    import detailIcon from '@/assets/images/detail.png';
    ```



### 最后放一张效果对比图
| 类别    | 服务启动时间              | 预构建                            | 编辑更新时间 | 打包内存 | 打包时间 | 生成文件大小 |
| ------- | ------------------------- | --------------------------------- | ------------ | -------- | -------- | ------------ |
| vite    | 首次`5s`，二次启动`500ms` | 首次`55s`，且随着不断缓存时间减少 | 秒热更新     | `5.85G`  | `3min`   | `16M`        |
| webpack | `38s`                     | --                                | `14s`        | `3.92G`  | `2min`   | `28M`        |

最后推荐一个预构建插件[vite-plugin-optimize-persist](https://www.npmjs.com/package/vite-plugin-optimize-persist)。在我们的业务代码中会有许多动态依赖项，我们一个个去设置到`vite`的配置`optimizeDeps`的`include`中很麻烦，尤其有的需要设置到具体文件路径而不是只设置到根目录，不设置的话在开发时当第一次加载这些时还是需要等待漫长时间的白屏时间等待其进行预构建。此插件会将动态依赖项自动分析添加到`optimizeDeps`的`include`中,这样别人下载源码第一次运行即使没有缓存也无需等待。
至此整个迁移完成的差不多了。祝大家玩得愉快