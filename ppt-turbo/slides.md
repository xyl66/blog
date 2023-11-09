---
theme: penguin
class: text-center
highlighter: prism
lineNumbers: false
info: |
  ## TurboRepo
drawings:
  persist: false
transition: slide-left
download: true
layout: intro
title: TurboRepo
mdc: true
hideInToc: true
---

# TurboRepo

Turbo 是一个用 Rust 编写的，针对 JavaScript 和 TypeScript 进行了优化的快速构建系统。

<div class="pt-12">
  <span @click="$slidev.nav.next" class="px-2 py-1 rounded cursor-pointer" hover="bg-white bg-opacity-10">
    开始 <carbon:arrow-right class="inline"/>
  </span>
</div>


---
hideInToc: true
---
# 目录
<div class="mb-6"></div>
<Toc maxDepth="1"></Toc>

---

# Monorepo介绍
在版本控制系统中，Monorepo（“mono”意为“单一”，“repo”是“存储库”的缩写）是一种软件开发策略，其中多个项目的代码存储在同一个存储库里面。

在 Monorepo 项目中你可以同时管理多个逻辑共存的应用程序，比如桌面应用程序和 Web 应用程序，甚至 Ios 应用也可以保存在 Monorepo 中，只要你愿意的话。

---

# Monorepo 演进
阶段一：单仓库巨石应用 〉阶段二：多仓库多模块应用 〉阶段三：单仓库多模块应用
<img src="/img/monorepo-progress.png" alt="" srcset="" class="h-90">

<!-- 
阶段一：单仓库巨石应用， 一个 Git 仓库维护着项目代码，随着迭代业务复杂度的提升，项目代码会变得越来越多，越来越复杂，大量代码构建效率也会降低，最终导致了单体巨石应用，这种代码管理方式称之为 Monolith。

阶段二：多仓库多模块应用，于是将项目拆解成多个业务模块，并在多个 Git 仓库管理，模块解耦，降低了巨石应用的复杂度，每个模块都可以独立编码、测试、发版，代码管理变得简化，构建效率也得以提升，这种代码管理方式称之为 MultiRepo。

阶段三：单仓库多模块应用，随着业务复杂度的提升，模块仓库越来越多，MultiRepo这种方式虽然从业务上解耦了，但增加了项目工程管理的难度，随着模块仓库达到一定数量级，会有几个问题：跨仓库代码难共享；分散在单仓库的模块依赖管理复杂（底层模块升级后，其他上层依赖需要及时更新，否则有问题）；增加了构建耗时。于是将多个项目集成到一个仓库下，共享工程配置，同时又快捷地共享模块代码，成为趋势，这种代码管理方式称之为 MonoRepo。
 -->

---

| 场景       | MultiRepo                                                                                                                                                                                                                                                | MonoRepo                                                                                                                                                                                                                                                  |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 开发迭代   | ✅ 仓库体积小，模块划分清晰，可维护性强。<br>❌ 多仓库来回切换（编辑器及命令行），项目多的话效率很低。多仓库见存在依赖时，需要手动 npm link，操作繁琐。  <br>❌ 依赖管理不便，多个依赖可能在多个仓库中存在不同版本，重复安装，npm link 时不同项目的依赖会存在冲突。 | ✅ 多个项目都在一个仓库中，可看到相关项目全貌，编码非常方便。<br>✅ 代码复用高，方便进行代码重构。<br>❌ 多项目在一个仓库中，代码体积多大几个 G，git clone时间较长。<br> ✅ 依赖调试方便，依赖包迭代场景下，借助工具自动 npm link，直接使用最新版本依赖，简化了操作流程。 |
| 工程配置   | ❌ 各项目构建、打包、代码校验都各自维护，不一致时会导致代码差异或构建差异。                                                                                                                                                                               | ✅ 多项目在一个仓库，工程配置一致，代码质量标准及风格也很容易一致。                                                                                                                                                                                        |
| 构建部署   | ❌ 多个项目间存在依赖，部署时需要手动到不同的仓库根据先后顺序去修改版本及进行部署，操作繁琐效率低。                                                                                                                                                       | ✅ 构建性 Monorepo 工具可以配置依赖项目的构建优先级，可以实现一次命令完成所有的部署。                                                                                                                                                                      |

---

| 场景       | MultiRepo                                                                                                                                                                                                                                                | MonoRepo                                                                                                                                                                                                                                                  |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 代码可见性 | ✅ 代码隔离，研发者只需关注自己负责的仓库 <br>  ❌ 包管理按照各自owner划分，当出现问题时，需要到依赖包中进行判断并解决。                                                                                                                                          | ✅ 一个仓库中多个相关项目，很容易看到整个代码库的变化趋势，更好的团队协作。<br>❌ 增加了非owner改动代码的风险                                                                                                                                                   |
| 依赖管理   | ❌ 多个仓库都有自己的 node_modules，存在依赖重复安装情况，占用磁盘内存大。                                                                                                                                                                                | ✅ 多项目代码都在一个仓库中，相同版本依赖提升到顶层只安装一次，节省磁盘内存                                                                                                                                                                                |
| 代码权限   | ✅ 各项目单独仓库，不会出现代码被误改的情况，单个项目出现问题不会影响其他项目。                                                                                                                                                                           | ❌ 多个项目代码都在一个仓库中，没有项目粒度的权限管控，一个项目出问题，可能影响所有项目。|
---

# Monorepo优点

- **方便复用**
类似的功能或沟通协定可以抽像到共享工具库中并直接包含在项目中，而不需要依靠套件管理器。
- **简化相依性套件管理**
在多个项目依赖于第三方相依性套件的多存储库环境中，该相依性套件可能会被多次下载或构建。在 monorepo 中，可以轻松优化构建，因为所引用的相依性套件都储存于同一代码库中。
- **原子化提交（Atomic commit）**
当一起运作的项目包含在单独的存储库中时，发布需要同步一个项目的哪些版本与另一个项目一起运作。在相当庞大的项目中，管理依赖之间的相容版本可能会变成依赖地狱（Dependencies hell）。在 monorepo 中，这个问题可以被解决，因为开发者可以原子化的方式修改多个项目。
- **大规模代码重构**
由于开发者可以存取整个项目，重构可以确保项目的每一个地方在重构之后可以继续运作。
- **跨团队协作**
在使用原始依赖（从原始代码编译的依赖）的 monorepo 中，团队可以改善其他团队正在进行的项目。这样能让代码所有人更富有弹性。

<!--
Mono-repo 侧重一致性，而 Multi-repo 侧重于解耦。

中大型项目，多模块项目，更适合用 MonoRepo 方式管理代码，在开发、协作效率、代码一致性方面都能受益

Google的monorepo，据推测是世界上最大的，符合超大规模系统的分类，必须在一个超过80TB的存储库中每天处理数以万计的提交。Piper：代码管理系统(类似github)，是一个强大的分布式版本控制和数据管理系统，它使用了 Google 自行开发的 Colossus 文件系统、索引机制等多项技术来实现高效的管理和处理大规模的代码库，并具有高可扩展性、高可靠性和高吞吐量等特点。
-->

---

# 基于 Monorepo 的传统解决方案

## Lerna

Lerna 是一个工具，可以优化使用 git 和 npm 管理多包存储库的工作流程。

Lerna 主流应用在处理版本、构建工作流以及发布包等方面。

你可以将 Lerna 管理的项目理解成为一个大的文件夹，其中每一个文件夹中都会包含一个独立的应用程序文件夹。

在独立的应用程序文件夹外，我们拥有一个大的文件夹来管理每个独立的文件夹，每当我们运行 Lerna 的命令进行构建、发布时，它内部会遍历所有的应用程序从而进行构建对应的包以及自动化的更新相关依赖版本。

## Yarn

Yarn 1.0 版本中，开发人员发布了一个名为 Workspaces 的功能主要用于基于 Monorepo 方案来管理多个应用程序之间的依赖处理。

通常业界主流基于 Lerna 负责发布和版本控制，而使用 Yarn Workspaces 来管理多个应用程序之间的依赖。

---

# 为什么选择 TurboRepo

上述提到传统的 Monorepo 解决方案中，项目构建时如果基于多个应用程序存在依赖构建，耗时是非常可怕的。

<img src="/img/why-turborepo-problem.webp" alt="" srcset="">
Monorepos 有很多优势，但它们难以扩展。每个工作区都有自己的测试套件、linting 和生成过程。单个 monorepo 可能有数百个任务要执行。
TurboRepo 的出现，正是解决 Monorepo 慢的问题。

---

# 在传统方案中运行任务
主要构建块：工作区和任务。假设您有一个包含三个工作区的 monorepo，每个工作区有三个任务

<img src="/img/your-workspaces-excalidraw.webp" alt="" srcset="">

<!--
apps/web apps/doc 都依赖 packages/shared .当它们被构建（通过 build ）时，它们需要 packages/shared 首先被构建。
-->

---

假设我们想在所有工作区中运行所有任务。使用类似 yarn 的工具，您可以运行如下脚本
```sh
yarn workspaces run lint
yarn workspaces run test
yarn workspaces run build
```
<img src="/img/yarn-workspaces-excalidraw.webp" alt="" srcset="" class="h-80">

TurboRepo 支持多个任务的并行处理，完美了的解决了 Lerna 构建时类似“单线程”的不足。

<!--
这是运行这些任务的最慢方法。每个任务都需要等待前一个任务完成才能开始。为了改进这一点，我们需要一个可以多任务处理的工具。
-->

---

# Turborepo运行任务
Turborepo可以通过了解任务之间的依赖关系来安排我们的任务并行运行以获得最大速度。
```sh
- yarn workspaces run lint
- yarn workspaces run test
- yarn workspaces run build
+ turbo run lint test build
```
<img src="/img/turborepo-excalidraw.webp" alt="" srcset="" class="h-70">

<!-- Turborepo将在所有可用的CPU上尽可能多地执行任务 -->

---

# 通过内容生成 Hash 甄别文件变动
<div class="flex justify-between" >
 <section class="w-100">Turborepo 检查文件内容变动时，会根据内容生成 Hash 来对比，而不是粗略的利用时间戳来确定需要构建的内容。</section>
<section>
  <img src="/img/cache-miss.webp" alt="" srcset="" class="w-90">
  <img src="/img/cache-hit.webp" alt="" srcset="" class="w-90">
</section>
</div>

<!--
Turborepo可以缓存任务的结果和日志。
第一次运行完成后，Turborepo 会将所有指定的输出（包括文件和日志）保存到新的缓存工件中，由哈希寻址。
第二次运行时
1.哈希将是相同的，因为输入没有改变（例如） 78awdk123
2.Turborepo 将找到具有匹配哈希的缓存工件
3.重播输出 - 将保存的日志打印到并将保存的输出文件还原到 stdout 文件系统中的相应位置。
-->

---

# 云缓存
通常针对于构建时产生的缓存文件大部分时都会记录在本地硬盘中，在多人合作或者 Docker 构建中这也就意味着仍然需要首次巨大的耗时，构建生成缓存后才会提升效率。
  <img src="/img/local-caching.webp" alt="" srcset="" class="w-85">

但 TurboRepo 开发团队提供了一项名为“云缓存”的功能，它支持将本地 turborepo 链接到远程缓存从而实现多人合作时共享缓存。
  <img src="/img/remote-caching.webp" alt="" srcset="" class="w-85">

---

# TurboRepo优点

## 更快的增量构建

TurboRepo 的基本原则是从不重新计算以前完成的工作, Turborepo 会记住你构建的内容并跳过已经计算过的内容，在多次构建开发时，这也就意味更少的构建耗时。

## 任务管道

Turborepo 支持在 package.json 中通过 pipeline 定义任务之间的关系，它会让 Turborepo 在构建内容上智能化的分析模块构建串/并执行顺序，从而大大的缩小构建时间。而不是类似于上文提到 Lerna 中仅机器化的支持单个任务的运行。

## 基于约定的配置

Turborepo 通过约定降低复杂性，使用 Turborepo 我们仅仅关心简单的 json 配置即可完成项目配置。

## 浏览器中的配置文件

Turbo 支持通过 有--profile标志 生成构建配置文件，你可以将它并将其导入 Chrome 或 Edge 以了解哪些任务花费的时间最长。

---
layout: two-cols
title: Turbo实战
level: 2
---

原始结构
```ts
.
├── build
│   ├── config
│   ├── generate
│   ├── script
│   └── vite
├── deploy
├── public
│   └── resource
├── src
│   ├── api
│   ├── assets
│   ├── components
│   ├── design
│   ├── directives
│   ├── enums
│   ├── hooks
│   ├── utils
│   └── views
└── types
    └── obboarding
```

::right::
新结构
```ts
.
├── apps
│   ├── member-portal
│   └── mterminal-portal
├── configs
│   ├── css-preprocess
│   ├── lint
│   ├── tsconfig
│   └── vite
├── deploy
├── packages
│   ├── assets
│   ├── business
│   ├── components
│   ├── constants
│   ├── hooks
│   ├── locale
│   ├── styles
│   ├── types
│   └── utils
└── scripts
    └── src
```

<!--
我们现有项目中的实际应用。
之前我们的原有项目结构都是左侧形式，一个项目就是一个仓库。
现在调整为新monorepo后，不同的项目都放在apps中。
他们共享的组件，逻辑等都可以放在packages中
-->

---

本地开发
<div class="flex justify-between" >
<img src="/img/dev-option.png" alt="" srcset="" class="w-90">
<img src="/img/dev-ready.png" alt="" srcset="" class="w-90">
</div>

线上发布
<div class="flex justify-between" >
<img src="/img/pro-member.png" alt="member-portal" title="member-portal" srcset="" class="w-90">
<img src="/img/pro-mt.png" alt="mt-portal" srcset="" class="w-90">
</div>

<!--
本地开发时选取要运行项目，由于我们采用的是vite，所以本地开发启动的速度也是很快的。
线上发布时可以看到左边有两个build只花了13s就完成了。
这是因为我们右边的是mt的任务，左边的是会员的任务，这两个只花费13s build的任务只有mt中有代码变动，
因为是一个仓库，代码合并后会同时触发两个项目的ci，由于会员相关代码没变动因此build时就使用了缓存
-->

---

# 微前端
微前端是一种架构风格，旨在当一个项目需要由多个小而散的微应用组合时，这些微应用可以独立开发、测试和部署，最终聚合成一个产品进行交付。（single-spa、qiankun、iframe）
<div class="flex justify-between">
<div>

  - **独立开发部署**
  - **增量升级**
  - **兼容多技术栈**
  - 跨应用导入
  - 应用间的通信
  - 共享依赖
</div>
<img src="/img/example.gif" alt="" srcset="" class="w-120">
</div>

<!--
微前端​这个术语最初来自 2016 年的 ThoughtWorks 技术雷达，它将微服务的概念扩展到了前端领域。

国内外对微前端的开发模式是不同的，single-spa 所提倡的是治理，要求所有的微应用都按照一定的开发规范去开发，这也和我们一开始给出的微前端的定义是相照应的——先拆再合，而国内的微前端框架是先合再拆，针对项目中已有的问题提供相应的解决方案，从而大大减小微前端项目的开发成本。
-->

---

# Why Not Iframe
为什么不用 iframe，这几乎是所有微前端方案第一个会被 challenge 的问题。但是大部分微前端方案又不约而同放弃了 iframe 方案，自然是有原因的，并不是为了 "炫技" 或者刻意追求 "特立独行"。

如果不考虑体验问题，iframe 几乎是最完美的微前端解决方案了。

iframe 最大的特性就是提供了浏览器原生的硬隔离方案，不论是样式隔离、js 隔离这类问题统统都能被完美解决。但他的最大问题也在于他的隔离性无法被突破，导致应用间上下文无法被共享，随之带来的开发体验、产品体验的问题。

1. url 不同步。浏览器刷新 iframe url 状态丢失、后退前进按钮无法使用。
2. UI 不同步，DOM 结构不共享。想象一下屏幕右下角 1/4 的 iframe 里来一个带遮罩层的弹框，同时我们要求这个弹框要浏览器居中显示，还要浏览器 resize 时自动居中..
3. 全局上下文完全隔离，内存变量不共享。iframe 内外系统的通信、数据同步等需求，主应用的 cookie 要透传到根域名都不同的子应用中实现免登效果。
4. 慢。每次子应用进入都是一次浏览器上下文重建、资源重新加载的过程。

---

# Mtermminal微前端实践

<div class="flex justify-between">
<div>
<img src="/img/iframe.gif" alt="" srcset="" class="w-100">
<p class="text-center">iframe</p>
</div>
<div>
<img src="/img/qiankun.gif" alt="" srcset="" class="w-100">
<p class="text-center">qiankun</p>
</div>
</div>

---

<div class="flex justify-between">
<img src="/img/main.png" alt="" srcset="" class="w-100">
<img src="/img/child.png" alt="" srcset="" class="w-100">
</div>

---

Thank you!
