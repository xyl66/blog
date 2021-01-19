# web性能监控
>文章转载自: AlloyTeam：http://www.alloyteam.com/2020/01/14184/
作者: liu, summerqy

也许你有听过一个问题，你这款 web 应用性能怎么样呀？你会回答什么呢？是否会优于海量 web 应用市场呢？本文就来整理下如何进行 web 性能监控？包括我们需要监控的指标、监控的分类、performance 分析以及如何监控。

但是，如何进行 web 性能监控本身是一个很大的话题，文中只会侧重一部分进行研究，某些内容不是很全面。

## 前言：为什么需要监控？
web 的性能一定程度上影响了用户留存率，Google DoubleClick 研究表明：如果一个移动端页面加载时长超过 3 秒，用户就会放弃而离开。BBC 发现网页加载时长每增加 1 秒，用户就会流失 10%。

我们希望通过监控来知道 web 应用性能的现状和趋势，找到 web 应用的瓶颈？某次发布后的性能情况怎么样？是否发布后对性能有影响？感知到业务出错的概率？业务的稳定性怎么样？

## 监控什么？
首先我们需要知道应该监控些什么呢？有哪些具体的指标？

google 开发者提出了一种 RAIL 模型来衡量应用性能，即：Response、Animation、Idle、Load，分别代表着 web 应用生命周期的四个不同方面。并指出最好的性能指标是：100ms 内响应用户输入；动画或者滚动需在 10ms 内产生下一帧；最大化空闲时间；页面加载时长不超过 5 秒。

![图片](https://tva1.sinaimg.cn/large/006tNbRwgy1gah4zxc779j314w0u07bg.jpg)
我们可转化为三个方面来看：响应速度、页面稳定性、外部服务调用
- 响应速度：页面初始访问速度 + 交互响应速度
- 页面稳定性：页面出错率
- 外部服务调用：网络请求访问速度

### 1.页面访问速度：白屏、首屏时间、可交互时间

我们来看看 google 开发者针对用户体验，提出的几个性能指标
![图片](https://mmbiz.qpic.cn/mmbiz_jpg/YBFV3Da0NwsKDJJUkJTEwLBWnTCxr1TrAN8M9xFY2NTLIZZIDA8m8licibAI1wzJYFk6nYVXAdibXvUhFzMkkuLTg/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

这几个指标其实都是根据用户体验，提炼出对应的性能指标
![图片](https://mmbiz.qpic.cn/mmbiz_jpg/YBFV3Da0NwsKDJJUkJTEwLBWnTCxr1TrREal8WaTfRmnagkPaayrjSmsY1EOROeQYDGQ6W5s1Rqia0qG9ibRMtZg/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

#### 1）first paint (FP) and first contentful paint (FCP)

首次渲染、首次有内容的渲染

这两个指标浏览器已经标准化了，从 performance 的 The Paint Timing API 可以获取到，一般来说两个时间相同，但也有情况下两者不同。
![图片](https://mmbiz.qpic.cn/mmbiz_jpg/YBFV3Da0NwsKDJJUkJTEwLBWnTCxr1Tr3d2MFqhG5Z8k1DaoybHVgibZqhSWr17JFh8EHPUbfaJaFD0oSlqO2ag/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

#### 2）First meaningful paint and hero element timing

首次有意义的渲染、页面关键元素

我们假设当一个网页的 DOM 结构发生剧烈的变化的时候，就是这个网页主要内容出现的时候，那么在这样的一个时间点上，就是首次有意义的渲染。这个指标浏览器还没有规范，毕竟很难统一一个标准来定义网站的主体内容。

google lighthouse 定义的 first meaningful paint：https://docs.google.com/document/d/1BR94tJdZLsin5poeet0XoTW60M0SjvOJQttKT-JK8HI/view

#### 3）Time to interactive

可交互时间

#### 4）长任务

浏览器是单线程的，如果长任务过多，那必然会影响着用户响应时长。好的应用需要最大化空闲时间，以保证能最快响应用户的输入。
![图片](https://mmbiz.qpic.cn/mmbiz_jpg/YBFV3Da0NwsKDJJUkJTEwLBWnTCxr1TrrOLfjBmibZl8fibsyo9T51icbJia9nicGA6oHPMKU0L5hGDMTGxFDqQ0IQA/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

### 2.页面稳定性：页面出错情况

- 资源加载错误
- JS 执行报错

### 3.外部服务调用

- CGI 耗时
- CGI 成功率
- CDN 资源耗时

## 监控的分类？
web 性能监控可分为两类，一类是合成监控（Synthetic Monitoring，SYN），另一类是真实用户监控（Real User Monitoring，RUM）
### 合成监控

合成监控是采用 web 浏览器模拟器来加载网页，通过模拟终端用户可能的操作来采集对应的性能指标，最后输出一个网站性能报告。例如：`Lighthouse`、`PageSpeed`、`WebPageTest`、`Pingdom`、`PhantomJS` 等。

#### 1. Lighthouse

`Lighthouse` 是 google 一个开源的自动化工具，运行 `Lighthouse` 的方式有两种：一种是作为 Chrome 扩展程序运行；另一种作为命令行工具运行。Chrome 扩展程序提供了一个对用户更友好的界面，方便读取报告。通过命令行工具可以将 `Lighthouse` 集成到持续集成系统。

展示了白屏、首屏、可交互时间等性能指标和 SEO、PWA 等。

腾讯文档移动端官网首页测速结果：
![图片](https://mmbiz.qpic.cn/mmbiz_jpg/YBFV3Da0NwsKDJJUkJTEwLBWnTCxr1TrbuDWRCZicyxT64UAUpk6TS2lWHp8iaibEZkw8QZ9c57ib2ianLAAaYPMicjQ/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

#### 2. PageSpeed

https://developers.google.com/speed/pagespeed/insights/

不仅展示了一些主要的性能指标数据，还给出了部分性能优化建议。

腾讯文档移动端首页测速结果和性能优化建议：
![图片](https://mmbiz.qpic.cn/mmbiz_jpg/YBFV3Da0NwsKDJJUkJTEwLBWnTCxr1TrIGJgDhLWCSHOGqCH4XrbcJPD92M5w5mw4eSYicgRooqQmLpelrIHtzw/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

#### 3. WebPageTest

WebPageTest

给出性能测速结果和资源加载的瀑布图。
![图片](https://mmbiz.qpic.cn/mmbiz_jpg/YBFV3Da0NwsKDJJUkJTEwLBWnTCxr1TrzlibI6e5UmGXyQw5L40bFxGUCTn2mAuS9yzaUibXJAHYzvdcK2lQ8okw/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

#### 4. Pingdom

https://www.pingdom.com/

注意：Pingdom 不仅提供合成监控，也提供真实用户监控。
![图片](https://mmbiz.qpic.cn/mmbiz_jpg/YBFV3Da0NwsKDJJUkJTEwLBWnTCxr1TrjeR5m2cKrwGkK8PJ2vJ5jXTMICcx67icgAl4qYv8k9iaiaEqg6GpiclCXw/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

合成监控方式的优缺点：

优点：

- 无侵入性。
- 简单快捷。缺点：
- 不是真实的用户访问情况，只是模拟的。
- 没法考虑到登录的情况，对于需要登录的页面就无法监控到。

### 二、真实用户监控

真实用户监控是一种被动监控技术，是一种应用服务，被监控的 web 应用通过 sdk 等方式接入该服务，将真实的用户访问、交互等性能指标数据收集上报、通过数据清洗加工后形成性能分析报表。例如 `FrontJs`、`oneapm`、`Datadog` 等。
![图片](https://mmbiz.qpic.cn/mmbiz_jpg/YBFV3Da0NwsKDJJUkJTEwLBWnTCxr1TrzAY9KbXZ8lt4q6jSHk6NtIR840OlS2JpQNyDFLZqGDW8xDeKXTxFIg/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

#### 1. oneapm

https://www.oneapm.com/bi/feature.html

功能包括：大盘数据、特征统计、慢加载追踪、访问页面、脚本错误、AJAX、组合分析、报表、告警等。
![图片](https://mmbiz.qpic.cn/mmbiz_jpg/YBFV3Da0NwsKDJJUkJTEwLBWnTCxr1Tr9tvRiayecyY12s08b02nMav2icht8AdmxUnoaTnkng02GrgPSvnSwgOQ/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)
##### 2. Datadog

https://www.datadoghq.com/rum/
![图片](https://mmbiz.qpic.cn/mmbiz_jpg/YBFV3Da0NwsKDJJUkJTEwLBWnTCxr1Tr9tvRiayecyY12s08b02nMav2icht8AdmxUnoaTnkng02GrgPSvnSwgOQ/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

#### 3. FrontJs

https://www.frontjs.com/

功能包括：访问性能、异常监控、报表、趋势等。
![图片](https://mmbiz.qpic.cn/mmbiz_jpg/YBFV3Da0NwsKDJJUkJTEwLBWnTCxr1TrSlVsUjoCkrICqzBrAEicaLl7jXcmAwppUI6Yvydl3B578vOtsIrdzSQ/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

这种监控方式的优缺点：

优点：
- 是真实用户访问情况。
可以观察历史性能趋势。
- 有一些额外的功能：报表推送、监控告警等等。缺点：
- 有侵入性，会一定程度上响应 web 性能。
## performance 分析
在讲如何监控之前，先来看看浏览器提供的 performance api，这也是性能监控数据的主要来源。

performance 提供高精度的时间戳，精度可达纳秒级别，且不会随操作系统时间设置的影响。

目前市场上的支持情况：主流浏览器都支持，大可放心使用。
![图片](https://mmbiz.qpic.cn/mmbiz_jpg/YBFV3Da0NwsKDJJUkJTEwLBWnTCxr1Trf0CspkMIlea8ia0QnkEhYVnlx2dhJNaf5yW5qNrNskicFT3MEaFOn5rA/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

### 基本属性

![图片](https://mmbiz.qpic.cn/mmbiz_jpg/YBFV3Da0NwsKDJJUkJTEwLBWnTCxr1TrWnrkrtvgmd0VtpGp5SgA0wdPGEvAtXSdibAL8yltMIZDOCJKae5OxtA/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

performance.navigation: 页面是加载还是刷新、发生了多少次重定向
![图片](https://mmbiz.qpic.cn/mmbiz_jpg/YBFV3Da0NwsKDJJUkJTEwLBWnTCxr1TrKrxvicfibr9yWbibveCxMfNIKvCUCmMnCFKVeeib4TZibBia2xt7mS43y0Vg/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

performance.timing: 页面加载的各阶段时长
![图片](https://mmbiz.qpic.cn/mmbiz_jpg/YBFV3Da0NwsKDJJUkJTEwLBWnTCxr1TrZVzClRfg8D44L0j0qDgRXqjicV7G1QsU2RUREYgiczMEZVpCku2V2p5A/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

各阶段的含义：
![图片](https://mmbiz.qpic.cn/mmbiz_jpg/YBFV3Da0NwsKDJJUkJTEwLBWnTCxr1TrtiaMk98EfhIWobD3LaZIlrlBCYe5HjsLguqPC2r8mGoLcumMuFTQjng/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

performance.memory：基本内存使用情况，Chrome 添加的一个非标准扩展
![图片](https://mmbiz.qpic.cn/mmbiz_jpg/YBFV3Da0NwsKDJJUkJTEwLBWnTCxr1TrubHxTtaLAYrfNM3yY7TZlLRS7N0mYXOwen5T8B3XEOnaaFzhPDCCfg/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

performance.timeorigin: 性能测量开始时的时间的高精度时间戳
![图片](https://mmbiz.qpic.cn/mmbiz_jpg/YBFV3Da0NwsKDJJUkJTEwLBWnTCxr1TrEVsAeQnScIs28na4RZ6OdsrU9gSGrqEmIPkX5lZKuGm4O3JhfhLdNg/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

### 基本方法

- `performance.getEntries()`

通过这个方法可以获取到所有的 `performance` 实体对象，通过 `getEntriesByName` 和 `getEntriesByType` 方法可对所有的 `performance` 实体对象 进行过滤，返回特定类型的实体。

`mark` 方法 和 `measure` 方法的结合可打点计时，获取某个函数执行耗时等。
![图片](https://mmbiz.qpic.cn/mmbiz_jpg/YBFV3Da0NwsKDJJUkJTEwLBWnTCxr1Tr6tn0QShfadJqPoxBEoPfmKohFFVuF846bZVOW4m7k56yYreicuLEfgw/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

- `performance.getEntriesByName()`
- `performance.getEntriesByType()`
- `performance.mark()`
- `performance.clearMarks()`
- `performance.measure()`
- `performance.clearMeasures()`
- `performance.now()`...

### 提供的 API

performance 也提供了多种 API，不同的 API 之间可能会有重叠的部分。

#### 1. PerformanceObserver API

用于检测性能的事件，这个 API 利用了观察者模式。

获取资源信息
![图片](https://mmbiz.qpic.cn/mmbiz_jpg/YBFV3Da0NwsKDJJUkJTEwLBWnTCxr1Trz8sJEQWrqInWYUZnMOdiaxD4iaZSictdQD2tibkYn9gSBXQaH2gDcIAN4A/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)
监测 TTI
![图片](https://mmbiz.qpic.cn/mmbiz_jpg/YBFV3Da0NwsKDJJUkJTEwLBWnTCxr1TrQOAcXKwAZI5KA1nagN80rpL6iciaejh67ykc1iaUNv5jZxoh2V6iaPI9dg/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

监测 长任务
![图片](https://mmbiz.qpic.cn/mmbiz_jpg/YBFV3Da0NwsKDJJUkJTEwLBWnTCxr1TroFeEAIu5kib0xc2zFiaI6GyjSD3GiaNaefnCNGXAVCEqnuiaw34aJ2rk6A/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

#### 2. Navigation Timing API

https://www.w3.org/TR/navigation-timing-2/

```js
performance.getEntriesByType("navigation");
```
![图片](https://mmbiz.qpic.cn/mmbiz_jpg/YBFV3Da0NwsKDJJUkJTEwLBWnTCxr1TrPSpYEZoU0gX4ovh7EgjbWUtkN3ESCNJeXZIODo78MjFdkFf7KttosQ/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)
![图片](https://mmbiz.qpic.cn/mmbiz_jpg/YBFV3Da0NwsKDJJUkJTEwLBWnTCxr1Tr9ib07DzQB2uHZZomCCQ9TRNPZbB0ePdPzCPgRtbtn1ChcoaZBmX5RqQ/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)


不同阶段之间是连续的吗? —— 不连续

每个阶段都一定会发生吗？—— 不一定
- 重定向次数：performance.navigation.redirectCount
- 重定向耗时: redirectEnd - redirectStart
- DNS 解析耗时: domainLookupEnd - domainLookupStart
- TCP 连接耗时: connectEnd - connectStart
- SSL 安全连接耗时: connectEnd - secureConnectionStart
- 网络请求耗时 (TTFB): responseStart - requestStart
- 数据传输耗时: responseEnd - responseStart
- DOM 解析耗时: domInteractive - responseEnd
- 资源加载耗时: loadEventStart - domContentLoadedEventEnd
- 首包时间: responseStart - domainLookupStart
- 白屏时间: domloading/dominteractive - fetchStart
- 首次可交互时间: domInteractive - fetchStart
- DOM Ready 时间: domContentLoadEventEnd - fetchStart
- 页面完全加载时间: loadEventStart - fetchStart
- http 头部大小：transferSize - encodedBodySize

#### 3. Resource Timing API
https://w3c.github.io/resource-timing/

```js 
performance.getEntriesByType("resource");
```
![图片](https://mmbiz.qpic.cn/mmbiz_jpg/YBFV3Da0NwsKDJJUkJTEwLBWnTCxr1Tr1otMUzWDag5sJ8vUqmLCvhk52SBlK5fPqJxyqhKrGxzH9Fn1tbLB4Q/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)
![图片](https://mmbiz.qpic.cn/mmbiz_jpg/YBFV3Da0NwsKDJJUkJTEwLBWnTCxr1TrUl2qwj3hhSx1oQoia3zx8L5RPux4Q0ZvDoE2HRW4Bn69Cueibk9guicvQ/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)
```js
// 某类资源的加载时间，可测量图片、js、css、XHR
resourceListEntries.forEach(resource => {
    if (resource.initiatorType == 'img') {
    console.info(`Time taken to load ${resource.name}: `, resource.responseEnd - resource.startTime);
    }
});
```
这个数据和 chrome 调式工具里 network 的瀑布图数据是一样的。

#### 4. paint Timing API

https://w3c.github.io/paint-timing/

首屏渲染时间(FP)、首次有内容渲染时间(FCP)
![图片](https://mmbiz.qpic.cn/mmbiz_jpg/YBFV3Da0NwsKDJJUkJTEwLBWnTCxr1TrfIwkUE0La98py7f9TicrTVzaeaCee1C0I6GkGicSBOAv76BSs0oPj6Yw/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

#### 5. User Timing API
https://www.w3.org/TR/user-timing-2/#introduction
主要是利用 mark 和 measure 方法去打点计算某个阶段的耗时，例如某个函数的耗时等。
#### 6. High Resolution Time API
https://w3c.github.io/hr-time/#dom-performance-timeorigin

主要包括 now() 方法和 timeOrigin 属性。

#### 7. Performance Timeline API
https://www.w3.org/TR/performance-timeline-2/#introduction

### 总结

#### 基于 performance 我们可以测量如下几个方面：

mark、measure、navigation、resource、paint、frame。

```js
let p = window.performance.getEntries();
```
重定向次数：`performance.navigation.redirectCount`

JS 资源数量: `p.filter(ele => ele.initiatorType === "script").length`

CSS 资源数量：`p.filter(ele => ele.initiatorType === "css").length`

AJAX 请求数量：`p.filter(ele => ele.initiatorType === "xmlhttprequest").length`

IMG 资源数量：`p.filter(ele => ele.initiatorType === "img").length`

总资源数量: `window.performance.getEntriesByType("resource").length`

#### 不重复的耗时时段区分：

重定向耗时: redirectEnd - redirectStart

DNS 解析耗时: domainLookupEnd - domainLookupStart

TCP 连接耗时: connectEnd - connectStart

SSL 安全连接耗时: connectEnd - secureConnectionStart

网络请求耗时 (TTFB): responseStart - requestStart

HTML 下载耗时：responseEnd - responseStart

DOM 解析耗时: domInteractive - responseEnd

资源加载耗时: loadEventStart - domContentLoadedEventEnd

#### 其他组合分析：
白屏时间: domLoading - fetchStart

粗略首屏时间: loadEventEnd - fetchStart 或者 domInteractive - fetchStart

DOM Ready 时间: domContentLoadEventEnd - fetchStart

页面完全加载时间: loadEventStart - fetchStart

#### JS 总加载耗时:
```js
const p = window.performance.getEntries();
let cssR = p.filter(ele => ele.initiatorType === "script");
Math.max(...cssR.map((ele) => ele.responseEnd)) - Math.min(...cssR.map((ele) => ele.startTime));
```
#### CSS 总加载耗时:
```js
const p = window.performance.getEntries();
let cssR = p.filter(ele => ele.initiatorType === "css");
Math.max(...cssR.map((ele) => ele.responseEnd)) - Math.min(...cssR.map((ele) => ele.startTime));
```
## 如何监控？
在了解了 performance 之后，我们来看看，具体是如何监控的？
![图片](https://mmbiz.qpic.cn/mmbiz_jpg/YBFV3Da0NwsKDJJUkJTEwLBWnTCxr1TrzAY9KbXZ8lt4q6jSHk6NtIR840OlS2JpQNyDFLZqGDW8xDeKXTxFIg/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)
总体流程：性能指标收集与数据上报—数据存储—数据聚合—分析展示—告警、报表推送

这里主要讲述如何收集性能数据。

性能指标收集注意项：

- 保证数据的准确性
- 尽量不影响应用的性能

### 1.基本性能上报

采集数据：将`performance navagation timing` 中的所有点都上报，其余的上报内容可参考 `performance` 分析一节中截取部分上报。例如：白屏时间，`JS` 和 `CSS` 总数，以及加载总时长。

其余可参考的上报：是否有缓存？是否启用 `gzip` 压缩、页面加载方式。在收集好性能数据后，即可将数据上报。

那选择什么时机上报？

google 开发者推荐的上报方式：
![图片](https://mmbiz.qpic.cn/mmbiz_jpg/YBFV3Da0NwsKDJJUkJTEwLBWnTCxr1TrQFR3oVfxMpgjt1Q4oWJbLTp3CHEVHVrick7hHrybw01GrSCKSuOaUiaw/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

### 2.首屏时间计算

我们知道首屏时间是一项重要指标，但是又很难从 performance 中拿到，来看下首屏时间计算主要有哪些方式？

https://web.dev/first-meaningful-paint/

1. 用户自定义打点—最准确的方式（只有用户自己最清楚，什么样的时间才算是首屏加载完成）
2. lighthouse 中使用的是 chrome 渲染过程中记录的 trace event
3. 可利用 Chrome DevTools Protocol 拿到页面布局节点数目。思想是：获取到当页面具有最大布局变化的时间点
4. aegis 的方法：利用 MutationObserver 接口，监听 document 对象的节点变化。

   检查这些变化的节点是否显示在首屏中，若这些节点在首屏中，那当前的时间点即为首屏渲染时间。但是还有首屏内图片的加载时间需要考虑，遍历 `performance.getEntries()` 拿到的所有图片实体对象，根据图片的初始加载时间和加载完成时间去更新首屏渲染时间。

5. 利用MutationObserver 接口提供了监视对 DOM 树所做更改的能力，是 DOM3 Events 规范的一部分。

   方法：在首屏内容模块插入一个 div，利用 Mutation Observer API 监听该 div 的 dom 事件，判断该 div 的高度是否大于 0 或者大于指定值，如果大于了，就表示主要内容已经渲染出来，可计算首屏时间。
6. 某个专利：在 loading 状态下循环判断当前页面高度是否大于屏幕高度，若大于，则获取到当前页面的屏幕图像，通过逐像素对比来判断页面渲染是否已满屏。
![图片](https://mmbiz.qpic.cn/mmbiz_jpg/YBFV3Da0NwsKDJJUkJTEwLBWnTCxr1Trbo61VJNzdlw7JsUicibuvVUL6mmaibicYZDibF8LbcWXKOpKYdQnZHN2mzQ/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

### 3.异常上报

- 1）js error监听 window.onerror 事件
- 2）promise reject 的异常监听 unhandledrejection 事件
  ```js
  window.addEventListener("unhandledrejection", function (event) {
      console.warn("WARNING: Unhandled promise rejection. Shame on you! Reason: "
          + event.reason);
  });
  ```
- 3）资源加载失败window.addEventListener('error')
- 4）网络请求失败重写 window.XMLHttpRequest 和 window.fetch 捕获请求错误
- 5）iframe 异常window.frames[0].onerror
- 6）window.console.error
### 4.CGI 上报

大致原理：拦截 ajax 请求

数据存储与聚合

一个用户访问，可能会上报几十条数据，每条数据都是多维度的。即：当前访问时间、平台、网络、ip 等。这些一条条的数据都会被存储到数据库中，然后通过数据分析与聚合，提炼出有意义的数据。例如：某日所有用户的平均访问时长、pv 等。

数据统计分析的方法：平均值统计法、百分位数统计法、样本分布统计法。

## 参考文章
- [为什么性能如此重要](https://developers.google.cn/web/fundamentals/performance/why-performance-matters)

- [Chrome 中的 First Meaningful Paint](https://juejin.im/entry/598080226fb9a03c5d535cd5)

- [蚂蚁金服](https://www.infoq.cn/article/Dxa8aM44oz*Lukk5Ufhy)

- [FMP](https://docs.google.com/document/d/1BR94tJdZLsin5poeet0XoTW60M0SjvOJQttKT-JK8HI/view#heading=h.k50nnyhtptq0)

- [如何搭建前端监控体系](https://www.zhihu.com/question/37585246)

- [FEX-7 天打造前端性能监控系统](https://fex.baidu.com/blog/2014/05/build-performance-monitor-in-7-days/)

- [首屏时间自动化](https://cloud.tencent.com/developer/article/1061844https://segmentfault.com/a/1190000013532766)

- [如何使用 performance api 来测量性能](https://blog.logrocket.com/how-to-practically-use-performance-api-to-measure-performance/Improving) 
- [Performance with the Paint Timing API](https://www.sitepen.com/blog/improving-performance-with-the-paint-timing-api/)

- [chrome-performance 页面性能分析使用教程](https://www.cnblogs.com/ranyonsue/p/9342839.html)

- [阿里云前端监控概述](https://help.aliyun.com/document_detail/58652.html?spm=a2c4g.11186623.6.627.7f782f4dsb9ZV7)

- [first load 与 first meaningful 的区别](https://webenso.com/forget-page-load-time/)

- [其他](https://cdc.tencent.com/2018/09/13/frontend-exception-monitor-research/)

- [lightHouse 实现原理](https://juejin.im/post/5dca05f45188250c643b7d76)

- [Test website performance with Puppeteer](https://michaljanaszek.com/blog/test-website-performance-with-puppeteer)