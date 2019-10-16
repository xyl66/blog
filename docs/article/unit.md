# 前端测试
## 测试类型
### unit测试
1. 主要对组件进行测试。
2. 数据的有效性测试
3. 关注组件本身。

vue 单元测试的范围仅限于数据流动是否正确，逻辑渲染是否正确（v-if v-show v-for），style 和 class 是否正确，我们并不需要关系这个组件在浏览器渲染中的位置，也不需要关系对其它组件会造成什么影响，只要保证组件本身正确即可。如表单校验、计算金额等校验等。
### E2E 测试
1. 测试真实DOM是否满足预期。
2. 测试业务流程
3. 变手动点点点为自动化处理
## 单元测试原因
1. 增强代码健壮性 增删改代码后保证不影响原先功能
2. 降低测试人员压力 提高测试效率
3. 提高逼格
## vue项目中进行单元测试
### 安装环境
1. 安装 Jest
```sh
$ npm install --save-dev jest @vue/test-utils
```
2. 处理单文件组件
```sh
npm install --save-dev vue-jest
```
3. 配置 Babel
```sh
npm install --save-dev babel-jest
```

具体参考[Vue Test Utils](https://vue-test-utils.vuejs.org/zh/guides/#%E9%80%89%E6%8B%A9%E4%B8%80%E4%B8%AA%E6%B5%8B%E8%AF%95%E8%BF%90%E8%A1%8C%E5%99%A8 '选择一个测试运行器')选择一个测试运行器
### 编写测试用例
如下是一个表单的校验测试

```js
import { mount, createLocalVue } from '@vue/test-utils'
import iview from 'iview'
import AddForm from '@/pages/config-manager/customer-complain-config/finish-rule-config/finish-rule/components/AddEditModal.vue'
import flushPromises from 'flush-promises'

const localVue = createLocalVue()
localVue.use(iview)
const selectArr = { "productChildTypeList": [{ "productTypeId": 8, "productTypeName": "门锁S2" }, 
// ...
], "complainTypeList": [{ "complaintTypeId": 2, "complaintTypeName": "客诉类型1", "createTime": "2019-10-10T12:07:54", "createUser": "", "enableState": 1, "id": 1, "updateTime": "2019-10-11T17:44:28", "updateUser": "", "version": 1 }, 
// ...
], "responsibleReasonList": [{ "createTime": "2019-10-10T12:11:07", "createUser": "", "enableState": 1, "feedbackReason": "反馈原因1", "feedbackReasonId": 2, "id": 1, "updateTime": "2019-10-10T12:11:07", "updateUser": "", "uploadImgState": 0, "uploadTimeState": 0, "version": 1 }, 
// ...
], "closeTicketList": [{ "createTime": null, "enableState": null, "id": null, "ruleBizTypeId": 5, "ruleDescription": null, "ruleId": 24, "ruleName": "客诉测试1", "updateTime": null }, 
// ...
], "useableStateList": [{ "id": 1, "name": "启用" }, { "id": 0, "name": "禁用" }] }
describe('完结规则-未选择数据点击提交', () => {
    const wrapper = mount(AddForm, {
        localVue,
        propsData: {
            selectArr: selectArr,
            arg: { productTypeId: '', complaintTypeId: '', feedbackReasonId: '3', droolsRuleList: '' }
        }
    })
    const vm = wrapper.vm
    const productItem = wrapper.find('form>div:nth-child(1)')
    const typeItem = wrapper.find('form>div:nth-child(2)')
    const reasonItem = wrapper.find('form>div:nth-child(3)')
    const closeItem = wrapper.find('form>div:nth-child(4)')
    /**
     * @description mock一个submit校验成功返回true失败返回false
     * @param {string} name - 表单名称
     * @returns {Boolean} - 校验结果
     */
    const mockFn = jest.fn(async (name) => {
        const result = await vm.$refs[name].validate()
        return result
    })
    wrapper.setMethods({ submit: mockFn })
    wrapper.find('form>div:nth-child(5) button').trigger('click');
    it('mockFn被调用1次', () => {
        // 断言mockFn被调用了两次次
        expect(mockFn).toHaveBeenCalledTimes(1);
    })
    it('产品子类未选,提示产品子类未选择', async () => {
        expect(productItem.contains('.ivu-form-item-error-tip'))
            .toBe(true)
    })
    it('客诉类型未选,提示客诉类型未选择', () => {
        expect(typeItem.contains('.ivu-form-item-error-tip'))
            .toBe(true)
    })
    it('反馈原因未选,提示反馈原因未选择', () => {
        expect(reasonItem.contains('.ivu-form-item-error-tip'))
            .toBe(true)
    })
    it('关单条件未选,提示关单条件未选择', () => {
        expect(closeItem.contains('.ivu-form-item-error-tip'))
            .toBe(true)
    })
})
describe('完结规则已选择数据-点击提交', () => {
    const wrapper = mount(AddForm, {
        localVue,
        propsData: {
            selectArr: selectArr,
            arg: { productTypeId: 9, complaintTypeId: 3, feedbackReasonId: 3, droolsRuleList: [25, 26] }
        }
    })
    const vm = wrapper.vm
    const productItem = wrapper.find('form>div:nth-child(1)')
    const typeItem = wrapper.find('form>div:nth-child(2)')
    const reasonItem = wrapper.find('form>div:nth-child(3)')
    const closeItem = wrapper.find('form>div:nth-child(4)')
    /**
     * @description mock一个submit校验成功返回true失败返回false
     * @param {string} name - 表单名称
     * @returns {Boolean} - 校验结果
     */
    const mockFn = jest.fn(async (name) => {
        const result = await vm.$refs[name].validate()
        return result
    })
    wrapper.setMethods({ submit: mockFn })
    wrapper.find('form>div:nth-child(5) button').trigger('click');
    it('mockFn被调用1次', () => {
        // 断言mockFn被调用了两次次
        expect(mockFn).toHaveBeenCalledTimes(1);
    })
    it('产品子类已选', async() => {
        await flushPromises()
        expect(productItem.html()).not.toContain('ivu-form-item-error-tip')
    })
    it('客诉类型已选', () => {
        expect(typeItem.html()).not.toContain('ivu-form-item-error-tip')
    })
    it('反馈原因已选', () => {
        expect(reasonItem.html()).not.toContain('ivu-form-item-error-tip')
    })
    it('关单条件已选', () => {
        expect(closeItem.html()).not.toContain('ivu-form-item-error-tip')
    })
})

```
校验结果
![校验通过](https://img-blog.csdnimg.cn/20191016175729953.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2E4NzI1NTg1,size_16,color_FFFFFF,t_70)
校验的数据规则
![在这里插入图片描述](https://img-blog.csdnimg.cn/20191016175940589.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2E4NzI1NTg1,size_16,color_FFFFFF,t_70)
子类已选且为字符串
![选项不为数字](https://img-blog.csdnimg.cn/20191016175956467.jpg)
结果
![输入数据不为数字](https://img-blog.csdnimg.cn/2019101618002888.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2E4NzI1NTg1,size_16,color_FFFFFF,t_70)
修改代码时修改错了参数名
![在这里插入图片描述](https://img-blog.csdnimg.cn/20191016180413129.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2E4NzI1NTg1,size_16,color_FFFFFF,t_70)
结果
![在这里插入图片描述](https://img-blog.csdnimg.cn/20191016180638128.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2E4NzI1NTg1,size_16,color_FFFFFF,t_70)
## 结论
关键地方可以进行单元测试。业务流程使用e2e较好