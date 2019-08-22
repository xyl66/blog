# js运行流程
> js引擎处理js的过程同传统编译语言的代码编译大致相同

## 流程
|步骤|传统编译语言|JS引擎|
|:-:|:-:|:-:|
|1|词法/语法分析|词/语法分析|
|2|解析生成AST|解析生成AST|
|3|代码生成|预编译|
|4|执行|执行|

## 预编译阶段
js代码是运行时编译（编译发生在代码执行前几微秒），即预编译完立即执行。预编译阶段进行初始化执行上下文

- 声明提升

  - 初始化上下文时有变量声明，先去作用域链查找是否已存在，无则创建属性并赋值undefined，有则不作处理
  - 初始化上下文时有函数声明，先去作用域链查找是否已存在，无则创建属性并赋值函数，有则覆盖
``` js
  function a(b) {
    console.log(b) 
    function b() {
      console.log(b)
    }
    b()
  }
  a(2)
```

- let、const阻止提升的原因
  - 预编译时，存在<font color="red">TDZ</font>暂时性死区
  - 遇到let,const声明变量放入TDZ中
  - 访问变量时，若存在TDZ中，则报错
  - 执行声明后，从TDZ中移除

``` js
var a =1
function fun() {    
      console.log(a)
      let a =1 
}    
console.log(a)
fun()
```

## LHS与RHS查找类型
- LHS `a = 1`
- RHS `console.log(a)`

```
  console.log(a)

  b = 1
```