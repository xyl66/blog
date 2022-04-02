# Docker 初体验
## 新建`Dockerfile`文件
执行一下内容
编译代码
- 开始stage-1 并命名为builder
- 拷贝当前目录下内容到容器
- 安装依赖
- 读取变量
- 注入环境变量
- 编译代码


部署nginx
开始stage-2 
- 拷贝从stage-1 生成结果到nginx文件夹
- 启动nginx服务

```js
FROM harbor.shopeemobile.com/mss/node:12.14.0-alpine as builder

COPY . .
RUN npm install

ARG env
ARG region

ENV APP_ENV $env
ENV APP_REGION $region

RUN npm run build

FROM harbor.shopeemobile.com/mss/nginx

COPY --from=builder build/ /usr/share/nginx/html/
EXPOSE 80

```

## 生成镜像
通过上一步的dockerfile文件创建一个名为vite:v2的镜像
```sh
Docker build -t vite:v2 --build-arg env=test  --build-arg region=th --build-arg sentryRelease=vn_test_vite-test_1631522092956 .
```

## 创建容器
我觉得也可以叫运行镜像，这里使用刚才创建的镜像创建一个名为`vite-test`的容器，将其80端口也就是nginx的默认端口映射到本地的3000端口
```sh
docker run --name vite-test -p 3000:80 vite:v2
```
这时就可以访问本地3000端口看到效果了