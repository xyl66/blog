# npm包管理
## 版本说明
`npm`包版本号： `[大版本].[中间版本].[小版本]`
- `^` 匹配到中间版本最新
- `~` 匹配到小版本最新
- 不加标记，采用固定版本

## lerna
>Lerna 是一个管理工具，用于管理包含多个软件包（package）的 JavaScript 项目。

代码库架构方式
- 单包架构
- 多包架构

lerna常用命令
1. `lerna bootstrap` clone下已存在的项目后在根目录运行该命令安装所有依赖项并链接交叉依赖
2. `lerna publish` 为已经更新过的软件包创建一个新版本。提示 输入新版本号并更新 git 和 npm 上的所有软件包。
3. `lerna run [script]` 在每一个包含 [script] 脚本的软件包中运行此 npm 脚本。
4. `lerna ls` 列出当前 Lerna 仓库中的所有公共软件包（public packages）。
## wix/wml
### 本地调试npm包方式
- 软链接 `npm link`
- 工具库 [wix/wml](https://github.com/wix/wml)

### 使用方法
全局安装
```sh
sudo npm i -g wml
```

进入对应package目录
```sh 
cd ~/Workspace/.../packages/rn-sdk
wml add ./  ~/work/[调用的项目地址]/node_modules/[包名称]
wml start
```

### 相关命令
`wml add` 建立联系
`wml start` 启动监听，保证`npm`包和所在`node_modules`保证实时同步。
`wml list` 是查看已有映射关系。