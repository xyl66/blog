# 忽略配置项脚本

``` bash
#!/bin/bash
 
#这里配置配置项
configArr=('./config/index.js' './src/main.js' './src/App.vue' './src/service/utils/devService.js' './src/utils/permission/index.js')

#提示“选择模式”，把用户的输入保存入变量type中
read -p "请选择模式: 1开发2测试打包3手动打包后进入开发模式4退出开发模式(默认1):" type
echo -e "\n"
case ${type:=1} in
1)
    echo "开发模式"
    echo "开始处理"
    #循环
    for item in ${configArr[@]}
    do
        ord="git update-index --skip-worktree ${item}"
        $ord
        if [ $? -ne 0 ] 
        then
            echo "忽略文件${item}失败"
        else
            echo "忽略文件${item}成功"
        fi
    done
    echo "处理完成"
    echo "已忽略项:"
    git ls-files -v | grep "^S"
;;
2)
    echo "测试打包"
    echo "开始处理..."
    #循环
    for item in ${configArr[@]}
    do
        ord="git update-index --no-skip-worktree ${item}"
        $ord
        if [ $? -ne 0 ] 
        then
            echo "取消忽略文件${item}失败"
        else
            echo "取消忽略文件${item}成功"
        fi
    done
    #文件放入stash
    git stash save "缓存配置文件"
    if [ $? -eq 0 ]
    then
        npm run build
        if [ $? -eq 0 ]
        then
            git stash pop
            echo "编译成功"
            #开发模式
            #循环
            for item in ${configArr[@]}
            do
                ord="git update-index --skip-worktree ${item}"
                $ord
                if [ $? -ne 0 ] 
                then
                    echo "忽略文件${item}失败"
                else
                    echo "忽略文件${item}成功"
                fi
            done
            echo "已进入开发模式"
        else
            echo "编译失败，请手动执行npm run build"
            echo "打包成功后执行执行3"
        fi
    fi 
;;
3)
    git stash pop
    #开发模式
    #循环
    for item in ${configArr[@]}
    do
        ord="git update-index --skip-worktree ${item}"
        $ord
        if [ $? -ne 0 ] 
        then
            echo "忽略文件${item}失败"
        else
            echo "忽略文件${item}成功"
        fi
    done
    echo "已进入开发模式"
;;
4)
    #退出开发模式
    #循环
    for item in ${configArr[@]}
    do
        ord="git update-index --no-skip-worktree ${item}"
        $ord
        if [ $? -ne 0 ] 
        then
            echo "还原忽略文件${item}失败"
        else
            echo "还原忽略文件${item}成功"
        fi
    done
    echo "已退出开发模式"
;;
*)
echo "其他选项"
;;
esac
```