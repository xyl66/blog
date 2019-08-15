#  SSR-Nuxt
> 前后端分离后单页面应用盛行，出现了服务端渲染的说法，其能更好的SEO

## 	什么是服务器端渲染 (SSR)
- 服务器将组件和获取到的数据解析生成html字符串，发送给客户端。过程同之前的php、java等的全栈开发，使用模板引擎，获取数据后解析为html字符串后，发到客户端展现。
- 服务器渲染的 Vue.js 应用程序，可以同时在**服务器**和**客户端**上运行。

## 	为什么使用服务器端渲染 (SSR)
-	更好的 SEO
	Google 和 Bing 可以很好对同步 JavaScript 应用程序进行索引。
-	更快的内容到达时间 (time-to-content)
	无需等待所有的 JavaScript 都完成下载并执行。
##	服务器端渲染 vs 预渲染 (SSR vs Prerendering)
少数营销页面（例如 /, /about, /contact 等）的 SEO，预渲染。

## 	Nuxt.js通用应用框架
[一个基于 Vue.js 的服务端渲染应用框架](https://zh.nuxtjs.org/guide)
###		流程图
![nuxt流程图](https://img-blog.csdnimg.cn/20190809114306895.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2E4NzI1NTg1,size_16,color_FFFFFF,t_70)
###		双模式
编译后同时生成客户端和服务端代码
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190809120912600.jpg)
-	url访问地址，服务端渲染后发给客户端
	![服务端渲染](https://img-blog.csdnimg.cn/20190809115917689.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2E4NzI1NTg1,size_16,color_FFFFFF,t_70)************************************************************************************************************
-	页面中**nuxt-link**标签跳转，客户端渲染。history模式，无刷新跳转（同单页应用路由跳转）
	![客户端渲染](https://img-blog.csdnimg.cn/20190809120422817.gif)

|函数| 服务端|路由更新|触发时间|其它
|--------- | ---------|--|----|---
|nuxtServerInit | 触发|不触发||store/index.js中设置
|asyncData|触发|触发|组件加载之前被调用|融合data返回
|fetch|触发|触发|渲染页面前被调用|填充（store）数据

### 注意事项
-	需要服务端渲染的数据使用asyncData获取
-	vue生命周期中获取的数据会保持客户端渲染（如下mounted中获取）
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190809142059471.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2E4NzI1NTg1,size_16,color_FFFFFF,t_70)