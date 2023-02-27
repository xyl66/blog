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
# build stage
FROM harbor.shopeemobile.com/mss/node:12.14.0-alpine as builder

COPY . .
RUN npm install

ARG env
ARG region

ENV APP_ENV $env
ENV APP_REGION $region

RUN npm run build

# production stage
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

## 通用的前端dockerfile
```js
# build stage
FROM node:lts-alpine as build-stage

WORKDIR /app

COPY package.json ./

RUN apt-get install libtool automake autoconf && npm install pnpm -g

RUN pnpm install --registry https://registry.npmmirror.com/

COPY . .

RUN npm run build

# production stage
FROM nginx:stable-perl as production-stage

COPY --from=build-stage /app/dist /usr/share/nginx/html

COPY --from=build-stage /app/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

## docker build
docker build命令用于从Dockerfile构建镜像。

典型用法
```sh
docker build  -t ImageName:TagName dir
```

**选项**

- -t 给镜像加一个Tag
- ImageName 给镜像起的名称
- TagName 给镜像的Tag名
- Dir Dockerfile所在目录


## 其它
部署脚本
```js
#!/bin/bash
if [[ ! -d drip_circle ]];then
  git clone https://github.git drip_circle
fi
  pushd drip_circle
    git pull
    cp ./deploy/dockerfile .
    container=$(docker ps -a|grep drip-circle:v1.0.2|awk '{print $1}')
    if [ $container != '' ];then
      docker rm -f $container
      docker rmi drip-circle:v1.0.2
    fi
    docker build -t drip-circle:v1.0.2 . && docker run --name dirp-circle-container -d -p 3001:80 drip-circle:v1.0.2
  popd
```
