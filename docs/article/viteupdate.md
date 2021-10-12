# webpack迁移至vite
### 步骤
- 根目录新增index.html  使用module引入入口文件
    ```ts
    <script type="module" src="/src/index.tsx"></script>
    ```
- 安装依赖
    ```sh
    yarn add -D vite @vitejs/plugin-legacy vite-plugin-importer @vitejs/plugin-react-refresh @rollup/plugin-babel sass
    ```

- 配置`package.json`

  ```json
  "scripts": {
    "vite-start": "vite",
    "vite-build": "vite build"
  }
  ```
- 配置`vite.config.js`

    ```ts
    /* eslint-disable */
    import legacyPlugin from '@vitejs/plugin-legacy';
    import usePluginImport from 'vite-plugin-importer';
    import * as path from 'path';
    import reactRefresh from '@vitejs/plugin-react-refresh';
    // @see https://cn.vitejs.dev/config/
    /* antd3需引入start */
    import vitePluginAntd3 from 'vite-plugin-antd3';
    import requireEsmPlugin from 'rollup-plugin-requiretoimport';
    /* antd3需引入end */

    // sentry插件用于上传map @see https://github.com/xyl66/rollup-plugin-sentry
    import rollupSentry from 'rollup-plugin-sentry';

    export default ({ command, mode }) => {
    let rollupOptions = {};

    let optimizeDeps = {
        include: ['@ant-design/icons'],
    };

    let alias = {
        '.cache': path.resolve(__dirname, './.cache'),
        '.git': path.resolve(__dirname, './.git'),
        '.vscode': path.resolve(__dirname, './.vscode'),
        config: path.resolve(__dirname, './config'),
        deploy: path.resolve(__dirname, './deploy'),
        node_modules: path.resolve(__dirname, './node_modules'),
        public: path.resolve(__dirname, './public'),
        scripts: path.resolve(__dirname, './scripts'),
        src: path.resolve(__dirname, './src'),
        'react-native': 'react-native-web',
        '@': path.resolve(__dirname, './src'),
    };

    let proxy = {};

    let define = {};

    let esbuild = {};

    return {
        root: './', // index.html文件所在位置
        base: '/', // js导入的资源路径，src
        resolve: {
        alias,
        },
        define: define,
        server: {
        // 代理
        proxy,
        hmr: {
            host: 'https://localhost.com/',
            port: '3000',
        },
        },
        build: {
        target: 'es2015',
        minify: 'terser', // 是否进行压缩,boolean | 'terser' | 'esbuild',默认使用terser
        manifest: false, // 是否产出maifest.json
        sourcemap: false, // 是否产出soucemap.json
        outDir: 'build', // 产出目录
        rollupOptions,
        },
        esbuild,
        optimizeDeps,
        plugins: [
        legacyPlugin({
            targets: [
            'Android > 39',
            'Chrome >= 60',
            'Safari >= 10.1',
            'iOS >= 10.3',
            'Firefox >= 54',
            'Edge >= 15',
            ],
        }),
        usePluginImport({
            libraryName: ' ', // todo please input your babel-plugin-import config
            libraryDirectory: ' ',
            style: 'css',
        }),
        reactRefresh(),
        vitePluginAntd3(), // antd3需引入
        requireEsmPlugin(),// antd3需引入
        rollupSentry({
        url: '',
        authToken:
          '',
        org: 'sentry',
        project: '',
        release: '001',
        include: [path.resolve(process.cwd(), 'build')],
        ignore: ['node_modules', 'webpack.config.js'],
        deleteAfterCompile: true,
        }),
        babel({
          extensions: ['.ts', '.tsx'],
          plugins: [
            ['@babel/plugin-proposal-decorators', { legacy: true }],
            ['@babel/plugin-proposal-class-properties', { loose: true }]
          ]
        })
        ],
        css: {
        preprocessorOptions: {
            //scss: {},
            less: {
            // 支持内联 JavaScript
            javascriptEnabled: true,
            },
        },
        },
    };
    };

    ```


- 配置`tsconfig.json`
  ```json
  - "target": "es5",
  + "target": "esnext",

  ```

- 如果使用了装饰器需引入`@rollup/plugin-babel`处理，不然会出现数据不更新
  
  ```js
      babel({
        extensions: ['.ts', '.tsx'],
        plugins: [
          ['@babel/plugin-proposal-decorators', { legacy: true }],
          ['@babel/plugin-proposal-class-properties', { loose: true }]
        ]
      })
  ```
### 效果对比
| 类别    | 服务启动时间              | 预构建                            | 编辑更新时间 | 打包内存 | 打包时间 | 生成文件大小 |
| ------- | ------------------------- | --------------------------------- | ------------ | -------- | -------- | ------------ |
| vite    | 首次`5s`，二次启动`500ms` | 首次`55s`，且随着不断缓存时间减少 | 秒热更新     | `5.85G`  | `3min`   | `16M`        |
| webpack | `38s`                     | --                                | `14s`        | `3.92G`  | `2min`   | `28M`        |

### 错误处理
1、`[vite] Internal server error: [BABEL] unknown: Using babel-preset-react-apprequires that you specify NODE_ENV or  environment variables. Valid values are "development", "test", and "production". Instead, received: undefined.`
<font color='orange'>
移除babel.config.json presets "react-app"
</font>


2、`[vite] Internal server error: Top-level selectors may not contain the parent selector "&".`

`.border-1px &::after` =>  `.border-1px {
    &::after {
    }
  }`

3、不停connecting
<font color='orange'>
由于我们使用zanproxy代理的原因，需修改vite源码，移除监听端口
</font>

4.`ts报错类型“ImportMeta”上不存在属性“env”。`
<font color='orange'>
ts配置添加 types": ["vite/client"]
</font>

5、 `antd 3 报错`
修改`import {Icon} from ‘antd’` => `import Icon from ‘antd/lib/Icon’`

6、 `umi/hooks报错
is not exported by node_modules/@umijs/use-request/lib/types.js`
<font color='orange'>types.js添加如下内容</font>
```js
Object.defineProperty(exports, "__esModule", {
    value: true
  });
```

7、`Uncaught TypeError: Failed to resolve module specifier "indexof". Relative references must start with either "/", "./", or "../".`
<font color='orange'> npm install indexof </font>

8、`makeObservable' is not exported by node_modules/mobx/lib/mobx.module.js`
<font color='orange'>yarn add mobx</font>

9、antd4中引入icon时 antd/lib 引入部分页面出现build后报错。修复不指定lib目录

### 注意事项
1、首次安装依赖最好使用`npm install` ，使用`yarn` 安装时需要运行`yarn yarn-repair`

2、环境变量`(process.env.REGION)`的问题，不要直接使用,特别是不要使用解构`const { APP_REGION = 'vn' } = process.env;`, 由原来的`process.env.REGION`统一变为由
```js
  import { APP_REGION,APP_ENV } from '@/utils'
```
导入使用。

3、不要使用`require`。图片使用`import`导入
```js
import detailIcon from '@/assets/images/detail.png';
```

4、ant字体库不要从lib中引入，避免出现打包后冲突 `'@ant-design/icons/lib'` 更改为 `'@ant-design/icons'`