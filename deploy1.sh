#!/usr/bin/env expect

# 确保脚本抛出遇到的错误
# set -e

# 生成静态文件
spawn npm run build

# 进入生成的文件夹
spawn cd docs/.vuepress/dist

# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME
spawn scp -r docs/.vuepress/dist/ root@132.232.60.166:~/static/doc/;
expect {
    *yes/no* { send "yes"; exp_continue }
    *password:* { send "x$7IMCE%3n0$ZZmH" }  
  }
interact

cd -