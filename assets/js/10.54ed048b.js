(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{362:function(s,a,t){"use strict";t.r(a);var n=t(42),r=Object(n.a)({},(function(){var s=this,a=s.$createElement,t=s._self._c||a;return t("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[t("h1",{attrs:{id:"docker-初体验"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#docker-初体验"}},[s._v("#")]),s._v(" Docker 初体验")]),s._v(" "),t("h2",{attrs:{id:"新建dockerfile文件"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#新建dockerfile文件"}},[s._v("#")]),s._v(" 新建"),t("code",[s._v("Dockerfile")]),s._v("文件")]),s._v(" "),t("p",[s._v("执行一下内容\n编译代码")]),s._v(" "),t("ul",[t("li",[s._v("开始stage-1 并命名为builder")]),s._v(" "),t("li",[s._v("拷贝当前目录下内容到容器")]),s._v(" "),t("li",[s._v("安装依赖")]),s._v(" "),t("li",[s._v("读取变量")]),s._v(" "),t("li",[s._v("注入环境变量")]),s._v(" "),t("li",[s._v("编译代码")])]),s._v(" "),t("p",[s._v("部署nginx\n开始stage-2")]),s._v(" "),t("ul",[t("li",[s._v("拷贝从stage-1 生成结果到nginx文件夹")]),s._v(" "),t("li",[s._v("启动nginx服务")])]),s._v(" "),t("div",{staticClass:"language-js line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[s._v("# build stage\n"),t("span",{pre:!0,attrs:{class:"token constant"}},[s._v("FROM")]),s._v(" harbor"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("shopeemobile"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("com"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("mss"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("node"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("12.14")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v(".0")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),s._v("alpine "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("as")]),s._v(" builder\n\n"),t("span",{pre:!0,attrs:{class:"token constant"}},[s._v("COPY")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token constant"}},[s._v("RUN")]),s._v(" npm install\n\n"),t("span",{pre:!0,attrs:{class:"token constant"}},[s._v("ARG")]),s._v(" env\n"),t("span",{pre:!0,attrs:{class:"token constant"}},[s._v("ARG")]),s._v(" region\n\n"),t("span",{pre:!0,attrs:{class:"token constant"}},[s._v("ENV")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token constant"}},[s._v("APP_ENV")]),s._v(" $env\n"),t("span",{pre:!0,attrs:{class:"token constant"}},[s._v("ENV")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token constant"}},[s._v("APP_REGION")]),s._v(" $region\n\n"),t("span",{pre:!0,attrs:{class:"token constant"}},[s._v("RUN")]),s._v(" npm run build\n\n# production stage\n"),t("span",{pre:!0,attrs:{class:"token constant"}},[s._v("FROM")]),s._v(" harbor"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("shopeemobile"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("com"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("mss"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("nginx\n\n"),t("span",{pre:!0,attrs:{class:"token constant"}},[s._v("COPY")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("--")]),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("from")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("builder build"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("usr"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("share"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("nginx"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("html"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token constant"}},[s._v("EXPOSE")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("80")]),s._v("\n\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br"),t("span",{staticClass:"line-number"},[s._v("9")]),t("br"),t("span",{staticClass:"line-number"},[s._v("10")]),t("br"),t("span",{staticClass:"line-number"},[s._v("11")]),t("br"),t("span",{staticClass:"line-number"},[s._v("12")]),t("br"),t("span",{staticClass:"line-number"},[s._v("13")]),t("br"),t("span",{staticClass:"line-number"},[s._v("14")]),t("br"),t("span",{staticClass:"line-number"},[s._v("15")]),t("br"),t("span",{staticClass:"line-number"},[s._v("16")]),t("br"),t("span",{staticClass:"line-number"},[s._v("17")]),t("br"),t("span",{staticClass:"line-number"},[s._v("18")]),t("br"),t("span",{staticClass:"line-number"},[s._v("19")]),t("br"),t("span",{staticClass:"line-number"},[s._v("20")]),t("br")])]),t("h2",{attrs:{id:"生成镜像"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#生成镜像"}},[s._v("#")]),s._v(" 生成镜像")]),s._v(" "),t("p",[s._v("通过上一步的dockerfile文件创建一个名为vite:v2的镜像")]),s._v(" "),t("div",{staticClass:"language-sh line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-sh"}},[t("code",[s._v("Docker build -t vite:v2 --build-arg "),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("env")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("test  --build-arg "),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("region")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("th --build-arg "),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("sentryRelease")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("vn_test_vite-test_1631522092956 "),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v(".")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br")])]),t("h2",{attrs:{id:"创建容器"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#创建容器"}},[s._v("#")]),s._v(" 创建容器")]),s._v(" "),t("p",[s._v("我觉得也可以叫运行镜像，这里使用刚才创建的镜像创建一个名为"),t("code",[s._v("vite-test")]),s._v("的容器，将其80端口也就是nginx的默认端口映射到本地的3000端口")]),s._v(" "),t("div",{staticClass:"language-sh line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-sh"}},[t("code",[s._v("docker run --name vite-test -p "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("3000")]),s._v(":80 vite:v2\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br")])]),t("p",[s._v("这时就可以访问本地3000端口看到效果了")]),s._v(" "),t("h2",{attrs:{id:"通用的前端dockerfile"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#通用的前端dockerfile"}},[s._v("#")]),s._v(" 通用的前端dockerfile")]),s._v(" "),t("div",{staticClass:"language-js line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[s._v("# build stage\n"),t("span",{pre:!0,attrs:{class:"token constant"}},[s._v("FROM")]),s._v(" node"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v("lts"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),s._v("alpine "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("as")]),s._v(" build"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),s._v("stage\n\n"),t("span",{pre:!0,attrs:{class:"token constant"}},[s._v("WORKDIR")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("app\n\n"),t("span",{pre:!0,attrs:{class:"token constant"}},[s._v("COPY")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("package")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("json "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("\n\n"),t("span",{pre:!0,attrs:{class:"token constant"}},[s._v("RUN")]),s._v(" apt"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("get")]),s._v(" install libtool automake autoconf "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("&&")]),s._v(" npm install pnpm "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),s._v("g\n\n"),t("span",{pre:!0,attrs:{class:"token constant"}},[s._v("RUN")]),s._v(" pnpm install "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("--")]),s._v("registry https"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),t("span",{pre:!0,attrs:{class:"token regex"}},[s._v("/registry.npmmirror.com/")]),s._v("\n\n"),t("span",{pre:!0,attrs:{class:"token constant"}},[s._v("COPY")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("\n\n"),t("span",{pre:!0,attrs:{class:"token constant"}},[s._v("RUN")]),s._v(" npm run build\n\n# production stage\n"),t("span",{pre:!0,attrs:{class:"token constant"}},[s._v("FROM")]),s._v(" nginx"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v("stable"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),s._v("perl "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("as")]),s._v(" production"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),s._v("stage\n\n"),t("span",{pre:!0,attrs:{class:"token constant"}},[s._v("COPY")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("--")]),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("from")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("build"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),s._v("stage "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("app"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("dist "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("usr"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("share"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("nginx"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("html\n\n"),t("span",{pre:!0,attrs:{class:"token constant"}},[s._v("COPY")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("--")]),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("from")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("build"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),s._v("stage "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("app"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("default")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("conf "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("etc"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("nginx"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("conf"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("d"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("default")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("conf\n\n"),t("span",{pre:!0,attrs:{class:"token constant"}},[s._v("EXPOSE")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("80")]),s._v("\n\n"),t("span",{pre:!0,attrs:{class:"token constant"}},[s._v("CMD")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"nginx"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"-g"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"daemon off;"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br"),t("span",{staticClass:"line-number"},[s._v("9")]),t("br"),t("span",{staticClass:"line-number"},[s._v("10")]),t("br"),t("span",{staticClass:"line-number"},[s._v("11")]),t("br"),t("span",{staticClass:"line-number"},[s._v("12")]),t("br"),t("span",{staticClass:"line-number"},[s._v("13")]),t("br"),t("span",{staticClass:"line-number"},[s._v("14")]),t("br"),t("span",{staticClass:"line-number"},[s._v("15")]),t("br"),t("span",{staticClass:"line-number"},[s._v("16")]),t("br"),t("span",{staticClass:"line-number"},[s._v("17")]),t("br"),t("span",{staticClass:"line-number"},[s._v("18")]),t("br"),t("span",{staticClass:"line-number"},[s._v("19")]),t("br"),t("span",{staticClass:"line-number"},[s._v("20")]),t("br"),t("span",{staticClass:"line-number"},[s._v("21")]),t("br"),t("span",{staticClass:"line-number"},[s._v("22")]),t("br"),t("span",{staticClass:"line-number"},[s._v("23")]),t("br"),t("span",{staticClass:"line-number"},[s._v("24")]),t("br"),t("span",{staticClass:"line-number"},[s._v("25")]),t("br")])]),t("h2",{attrs:{id:"docker-build"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#docker-build"}},[s._v("#")]),s._v(" docker build")]),s._v(" "),t("p",[s._v("docker build命令用于从Dockerfile构建镜像。")]),s._v(" "),t("p",[s._v("典型用法")]),s._v(" "),t("div",{staticClass:"language-sh line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-sh"}},[t("code",[s._v("docker build  -t ImageName:TagName "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("dir")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br")])]),t("p",[t("strong",[s._v("选项")])]),s._v(" "),t("ul",[t("li",[s._v("-t 给镜像加一个Tag")]),s._v(" "),t("li",[s._v("ImageName 给镜像起的名称")]),s._v(" "),t("li",[s._v("TagName 给镜像的Tag名")]),s._v(" "),t("li",[s._v("Dir Dockerfile所在目录")])]),s._v(" "),t("h2",{attrs:{id:"其它"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#其它"}},[s._v("#")]),s._v(" 其它")]),s._v(" "),t("p",[s._v("部署脚本")]),s._v(" "),t("div",{staticClass:"language-js line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[s._v("#"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("!")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("bin"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("bash\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("if")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("!")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),s._v("d drip_circle "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("then\n  git clone https"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("github"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("git drip_circle\nfi\n  pushd drip_circle\n    git pull\n    cp "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("deploy"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("dockerfile "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("\n    container"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("$")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("docker ps "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),s._v("a"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("grep drip"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),s._v("circle"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v("v1"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0.2")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("awk "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'{print $1}'")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("if")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v(" $container "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("!=")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("''")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("then\n      docker rm "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),s._v("f $container\n      docker rmi drip"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),s._v("circle"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v("v1"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0.2")]),s._v("\n    fi\n    docker build "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),s._v("t drip"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),s._v("circle"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v("v1"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0.2")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("&&")]),s._v(" docker run "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("--")]),s._v("name dirp"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),s._v("circle"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),s._v("container "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),s._v("d "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),s._v("p "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("3001")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("80")]),s._v(" drip"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),s._v("circle"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v("v1"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0.2")]),s._v("\n  popd\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br"),t("span",{staticClass:"line-number"},[s._v("9")]),t("br"),t("span",{staticClass:"line-number"},[s._v("10")]),t("br"),t("span",{staticClass:"line-number"},[s._v("11")]),t("br"),t("span",{staticClass:"line-number"},[s._v("12")]),t("br"),t("span",{staticClass:"line-number"},[s._v("13")]),t("br"),t("span",{staticClass:"line-number"},[s._v("14")]),t("br")])])])}),[],!1,null,null,null);a.default=r.exports}}]);