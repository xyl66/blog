# 面试题
## Html

## Css
### float
  - 清除浮动
  - BFC
  - 块状化

### 内联元素
  - ex与x-height
  - line-height 1.5 150% 1.5em 区别
    - 行距半行距
  - verticle-align
  - sub、pub标签实现

## Js
### 类型
  - 数据类型 symbol
  - undefined、void(0)区别

  - NaN
    - ``` NaN === NaN // 输出 ```
    - ``` typeof NaN // 输出 ```

  - 数据格式化
    - ``` parseInt、Number、Math.floor 不同点```

### 内存
  - ``` arr = [] 与 arr.length = 0 区别 ```
  - 垃圾回收机制
  - 回收触发时机

### Vue
  - 生命周期 
    - initData
    - initComputed
  - this.$nextTicket 实现
    - setTimeout
    - Promise
    - process.nextTick()
    ``` js
      setTimeout(function(){
        console.log('1');
      })
      process.nextTick(()=>console.log('2'))
      console.log('3')
    ```
    ``` js
      setTimeout(function(){
        console.log('1');
      })
      Promise.resolve().then(()=>console.log('2'))
      console.log('3')
    ```

