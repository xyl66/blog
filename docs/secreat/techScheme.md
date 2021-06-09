# contack list(ID)

## 一、背景及目的
1. 背景：
   目前 Mitra 主要业务为商家提供在 APP 为其线下客户购买虚拟商品的服务，大部分情况下，客户来源为商家周边的用户。根据数据显示，目前不同 DP 业务下，复购客户占比几乎都在`50%`以上，客户信息的重复度较高。
2. 为了`提升商家运营效率`，增加`联系人功能`，目标服务商家维护`复购率较高`的客户的账号信息。同时提供功能服务商家在购买流程中`快速引用`，方便商家对复购率较高的客户进行关联，优化面对面的购买流程。[具体需求点此查看](https://confluence.shopee.io/pages/viewpage.action?pageId=507545413#id-[ID]ContactListFavoriteNumber/PhoneBookforBill,PLNTokenandDP-1.需求背景与目标)


## 二、逻辑架构
![contact整体流程](https://i.loli.net/2021/05/21/wBLpGrlNa3VfiFm.png)

## 三、前端逻辑设计
- 3.1 整体流程

   ![](https://gitee.com/xiaobai1hao/images/raw/master/files/Untitled%20Diagram.png)

- 3.2. getContactList 流程

    ![20210521102710](https://i.loli.net/2021/05/21/iNFYrbwsc6KeyTB.png)

- 3.3 结果以及详情页流程
  
  ![](https://gitee.com/xiaobai1hao/images/raw/master/files/%5BRN%5DcontactList%E7%BB%93%E6%9E%9C%E8%AF%A6%E6%83%85%E9%A1%B5.jpg)

## 四、接口设计
- 4.1 `contactList` 对象结构
    ```js
    const contactList = [
    {
        userName: "联系人姓名",
        accounts: ["123456-1", "123456-2", "123456-3"],
    },
    ];
    ```

- 4.2 处理后便于 `filter` 的结构

    ```js
    const resContactList = [
    {
        userName: "联系人姓名",
        account: "123456-1",
    },
    {
        userName: "联系人姓名",
        account: "123456-2",
    },
    {
        userName: "联系人姓名",
        account: "123456-3",
    },
    ];
    ```

- 4.3 结果以及详情页获取的数据中需新增需要显示新增联系人按钮数据以及`phone/account`、`当前产品类型`等字段方便native端进行添加联系人；从native获取到的数据中`outTradeNo`、`tradeId`、`service_name`可明确获取到
  - 4.3.1 `outTradeNo`、`tradeId` 用于从be获取数据
  - 4.3.2 `service_name:"prepaid_pln"` 是否可用于添加联系人时标记产品


## 五、前端监控
接口监控: `js-bridge`成功率


## 六、遗留问题与风险预估
- 6.1 获取不到contactList时不影响下单流程
- 6.2 联想输入框不影响原有逻辑


## 七、部署方案与环境要求
- `React Native` 端
  `BE`、`native`侧先进行部署，`RN`侧后部署


## 八、附录