#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run build

# 进入生成的文件夹
cd docs/.vuepress/dist

# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME
expect -c "
  set timeout 1;
  spawn scp -r ./ root@132.232.60.166:~/static/doc/;
  expect {
      *yes/no* { send "yes\r"; exp_continue }
      *password:* { send "x$7IMCE%3n0$ZZmH\r" }  
    }
  interact
"
cd -