
# web开发指引

## 环境配置
1. chrome访问`https://local.[环境].[业务域名]`通过代理插件`SwitchyOmega`代理到本机`zanproxy`(8001端口)

    `SwitchyOmega`配置情景规则走`proxy`至`zanproxy`

2. `zanproxy`再根据规则集将符合`loacl`**url**转发至本机3000端口

**注意事项**

- 页面地址`local`+`域名`需与接口`域名`一致，不然无法注入`cookie`
- 需安装证书

## admin相关
- 权限:`[平台名称].[页面路径]/[接口地址]`

  >`APC-admin`<sup>平台名称</sup>.`User.User_Search`<sup>页面路径</sup>./`apc_account_AdminService/GetUserRoleColumn`<sup>接口地址</sup>
- `src/util/request`中定义无权限提醒
  
  接口返回`ret=10014`