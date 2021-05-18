
# RN开发指引
## `Navigator`导航
#### RN到RN
```js
import { Navigator } from '@shopee/react-native-sdk';
```
- 推入新页面
    ```js
    Navigator.push(
    rootTag, //rootTag从页面的props中读取，页面的props已自动注入
    packageName, // '@shopee-rn/foody'
    pageName, // 'WELCOME_PAGE'
    {
        foo: 'bar', // propsdata received by target page
    }
    );
    ```
- 跳转(清除stack，仅保留主页)

    ``` js
    Navigator.jumpRN(
    rootTag,
    tab, // 'me', which tab to show for homepage
    packageName // '@shopee-rn/foody'
    pageName, // 'WELCOME_PAGE'
    {
        foo: 'bar', // propsdata received by target page
    },
    animated, // false
    );
    ```
#### RN到native
```js
Navigator.navigateAppPath(
  rootTag,
  path, // 'chat'
  {
    foo: 'bar', // propsdata received by target page
  }
);
```

#### RN到webview
```js
Navigator.navigateWeb(
  rootTag,
  {
    url: 'https://google.com',
    ... // other params
  }
)
```

#### webview到native
```js
bridgeCallHandler('navigateAppRL', {
  apprl: 'rn/@shopee-rn/awesome-plugin/HOME_PAGE',
  params: {
    foo: 'bar',
  },
});
```

## 页面新增
### 主入口
> 需要app配置啥的暂时不知

### 子页面
- **step1** `pages`中新增文件夹`Home`页面
    > - 继承`PageComponent`
    > - 使用`PageContainer`生成,用于注册Page

    新增`pages>Home>index.js`
    ```js
    import { PageComponent } from '@shopee/react-native-sdk';
    export default class HomePage extends PageComponent{}

    PageContainer(MODULES.HOME_PAGE, HomePage);
    ```
- **step2** `src/Constants.js`中添加模块名

    ```diff
    export const MODULES = {
    WELCOME_PAGE: 'WELCOME_PAGE',
    DEMO_PAGE: 'DEMO_PAGE',
    + HOME_PAGE: 'HOME_PAGE',
    };
    ```

- **step3** `src>index.js`导入页面
    ```diff
    import './pages/Welcome';
    import './pages/Demo';
    + import './pages/Home'
    ```
- **step4** merge远程发包
  - 分支名jira版本号命名
  - merge时加上单号`[MITRA-27746] `
- **step5** 更改version

## `git`版本管理
<details>
  <summary><mark><font color=darkred>点击查看详情</font></mark></summary>
<div>
<table>
<thead>
<tr>
<th>分支</th>
<th>命名</th>
<th>说明</th>
</tr>
</thead>
<tbody>
<tr>
<td>master</td>
<td>live-[版本号]-[发布日期]-(hotfix-[Jira单])</td>
<td>tag命名规范</td>
</tr>
<tr>
<td>release</td>
<td>release-[版本号]-[发布日期]</td>
<td>用于uat，从master拉取</td>
</tr>
<tr>
<td>test</td>
<td>test-[版本号]-[发布日期]</td>
<td></td>
</tr>
<tr>
<td>feature</td>
<td>feature-MITAR-XXXX-[描述]</td>
<td>从master拉取，MITRA-XXXX 表示 JIRA 的 TASK 编号</td>
</tr>
<tr>
<td>hotfix</td>
<td>hotfix-[Bug编号]</td>
<td>从 master 分支拉取，JIRA 的 BUG 编号</td>
</tr>
</tbody>
</table>
</div>
</details>


