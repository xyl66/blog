# 项目搭建
>
>Vite、Vue3、Typescript

## 创建项目

### 使用vite命令初始化项目这里使用`vue、Typescript`模板

```js
npm create vite@latest my-vue-app --template vue-ts
```

### 配置tsx支持

```js
// vite.config.js
import vueJsx from '@vitejs/plugin-vue-jsx'

export default {
  plugins: [
    vueJsx({
      // options are passed on to @vue/babel-plugin-jsx
    }),
  ],
}
```

## 配置eslint

### 安装eslint

```shell
npm install -D eslint prettier eslint-config-prettier eslint-plugin-prettier eslint-plugin-vue @typescript-eslint/eslint-plugin @typescript-eslint/parser
```

### 初始化eslint

```shell
npx eslint --init
```

### 处理vue检查

修改`.eslintrc.cjs`配置

```js
parser: "vue-eslint-parser",
parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    parser: "@typescript-eslint/parser",
},
```

## 配置husky

### install `husky`

```shell
npm i lint-staged husky -D
```

### enable `Git hooks`

```shell
npx husky install
```

### To automatically have Git hooks enabled after install, edit `package.json`

```shell
npm pkg set scripts.prepare="husky install"
```

### 创建pre-commit

```shell
npx husky add .husky/pre-commit 'npx lint-staged' && git add .husky/pre-commit
```

## 配置stylelint

参考[stylelint](https://stylelint.io/user-guide/get-started)

### 添加命令

```js
"scripts": {
    "lint:styles": "stylelint ./**/*.{css,scss}",
    "format:styles": "stylelint ./**/*.{css,scss} --fix",
}
```

## 配置lint-staged只 lint 改动的

`lint-stadge的出现，它是只检查本次提交所修改(指 git 暂存区[5]里的东西)的问题，这样每次 lint 量就比较小`

### 安装

```shell
npm install -D lint-staged
```

### 新增`.lintstagedrc`配置

```json
"lint-staged": {
    "*.{js,jsx,ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ],
    "{!(package)*.json,*.code-snippets,.!(browserslist)*rc}": [
      "prettier --write--parser json"
    ],
    "package.json": [
      "prettier --write"
    ],
    "*.vue": [
      "eslint --fix",
      "prettier --write",
      "stylelint --fix"
    ],
    "*.{scss,less,styl,html}": [
      "stylelint --fix",
      "prettier --write"
    ],
    "*.md": [
      "prettier --write"
    ]
  }

```

### 安装commitlint

```shell
npm install -D @commitlint/{config-angular,config-conventional,cli}
```

### 配置commitlint.config

```js
module.exports = { extends: ['@commitlint/config-angular'] };
```

### 添加husky钩子

```shell
npx husky add .husky/commit-msg "npx --no-install commitlint --edit '$1'"
```
