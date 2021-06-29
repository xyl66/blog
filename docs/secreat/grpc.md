# transervice-id
## Grpc
>谷歌出的基于`http2`的`rpc`框架
## `http` 与 `rpc`
`http`也属于`rpc`，是一种特殊的`rpc`,复杂效率慢，因此会有一些其它自定义`rpc`
## 服务调用
![](https://gitee.com/xiaobai1hao/images/raw/master/files/%E6%9C%AA%E5%91%BD%E5%90%8D%E7%BB%98%E5%9B%BE%20(1).jpg)

## 环境搭建
1. 配置测试环境隧道，通过ssh建立端口转发到远程跳板机服务器。
  - 申请ssh权限
  - 申请跳板机权限
  - 查看etcd节点、并建立连接（开发时用，可略过）
2. 安装[bloomrpc](https://github.com/uw-labs/bloomrpc/releases)调试工具

## transervice-id开发流程
1.  添加服务

    1.1 下载并导入proto![](https://gitee.com/xiaobai1hao/images/raw/master/files/%E6%88%AA%E5%B1%8F2021-06-22%20%E4%B8%8B%E5%8D%883.30.09.png)

    1.2 配置config,`config>index.ts`中新增服务配置
    ```ts
    services:{
        //...
        ContactService: {
            url: 'apc.contact',
            name: 'AppService',
        },
    }
    ```
    其中`url`为proto文件的`package`字段,`name`为`service`
    ![](https://gitee.com/xiaobai1hao/images/raw/master/files/%E6%88%AA%E5%B1%8F2021-06-22%20%E4%B8%8B%E5%8D%884.04.47.png)

    1.3 配置隧道脚本文件`deploy>getAddress.js`，在对应的接口中加入服务名`apc.contact.AppService`
    ![](https://gitee.com/xiaobai1hao/images/raw/master/files/%E6%88%AA%E5%B1%8F2021-06-22%20%E4%B8%8B%E5%8D%884.09.06.png)

    1.4 设置开发调试链接到隧道，运行对应的`etcd`文件查找服务`IP端口`,
    ```sh
    ./etcd-id
    ```
    ![](https://gitee.com/xiaobai1hao/images/raw/master/files/%E6%88%AA%E5%B1%8F2021-06-22%20%E4%B8%8B%E5%8D%884.15.01.png)

    1.5 `utils>grpcClinet.ts`中配置dev环境服务
    ```js
    if (process.env.APP_ENV === 'dev') {
        //...
        if (serviceKey === 'ContactService') {
            const p = `${process.cwd()}/dpProtobuf/contactService.proto`;
            const ppp = protoLoader.loadSync(p, opt);
            const pcc = grpc.loadPackageDefinition(ppp);
            //@ts-ignore
            const psc = pcc.apc.contact; // 包名
            proxy = {
            AppService: new psc.AppService( // 服务key名需与1.2的config中name一致一致
              '127.0.0.1:31203', // 1.4中的找到的服务对应的端口
              grpc.credentials.createInsecure()
            ),
          };
        }
    }
    ```

    2.调用
    ```js
    const fetchContactInfo = async (orderId: string, metadata: Metadata) => {
      const params = Buffer.from(JSON.stringify({ order_id: orderId }));
      try {
        const { content } = await servants.ContactService(
          'CheckAccountJSON',
          { content: params },
          metadata
        );
        const res = JSON.parse(content.toString());
        return {
          ...res,
        } as CheckType;
      } catch (err) {
        console.log(err);
      }
    };
    ```

    ## 调试
    1. 建立隧道，项目根目录执行便捷脚本

        ```sh
        yarn get
        ```
        ![](https://gitee.com/xiaobai1hao/images/raw/master/files/20210629171159.png)
    
    2. 启动服务launch progrm不行则建里一个dev的![](https://gitee.com/xiaobai1hao/images/raw/master/files/20210629171306.png)
    3.  使用`bloomrpc`导入`proto`![](https://gitee.com/xiaobai1hao/images/raw/master/files/20210629170724.png)
    4.  调用方法注意`metadata`中的uid需和单号对应![](https://gitee.com/xiaobai1hao/images/raw/master/files/20210629171606.png)