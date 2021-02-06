# Vue3响应式实现原理
### 源码实现
```js
/*
 * @作者: xiangyulong
 * @创建时间: 2020-05-14 17:11:30
 * @最新更新时间: 2020-05-14 18:47:15
 * @最新更新人: xiangyulong
 * @描述: 
 */
// 原始=》响应
let toProxy = new WeakMap()
// 响应=》原始
let toRaw = new WeakMap()

// 临时effect
let effectStack = []

// 保存依赖对象
let targetMap = new WeakMap()
const handle={
  get(target,key){
    let res = Reflect.get(target,key)
    // 收集依赖
    track(target,key)
    // 为对象则递归
    return typeof res === 'object'?reactive(res):res
  },
  set(target,key,val){
    // 保存旧信息
    const info = {oldVal:target[key],newVal:val}
    let res = Reflect.set(target,key,val)
    // 触发响应
    trigger(target,key,info)
    return res
  }
}
 // 拦截数据，生成响应式
function reactive(obj){
  // 缓存中查找
  let res = toProxy.get(obj)
  if(res){
    return res
  }
  if(toRaw.get(obj)){
    return obj
  }
  // 未找到则进行响应式处理
  res = new Proxy(obj,handle)

  // 加入缓存
  toProxy.set(obj,res)
  toRaw.set(res,obj)

  return res
}

// 收集依赖
function track(target,key){
  // 获取当前effect
  let effect = effectStack[effectStack.length-1]
  
  if(effect){
    let depMap = targetMap.get(target)
    if(depMap===undefined){
      // 对象不存在依赖则生成并保存
      depMap = new Map()
      targetMap.set(target,depMap)
    }
    let dep = depMap.get(key)
    if(dep===undefined){
      // key不存在初始化 set用于保存effect
      dep = new Set()
      depMap.set(key,dep)
    }
    // 判断当前effect是否存在,不存在则搜集
    if(!dep.has(effect)){
      dep.add(effect)
      effect.deps.push(dep) // 双向保存
    }
  }
}

// 发布消息
function trigger(target,key,info){
  let depMap = targetMap.get(target)
  if(depMap===undefined){
    return
  }
  if(key){
    let deps = depMap.get(key)
    let effects = new Set()
    let computedRunner = new Set()
    deps.forEach(effect=>{
      if(effect.computed){
        computedRunner.add(effect)
      }else{
        effects.add(effect)
      }
    })
    console.log('吃')
    // 执行
    effects.forEach(i=>i())
    
    computedRunner.forEach(i=>i())
  }
}

// computed 特殊的effect
function computed(fn){
  let res = effect(fn,{computed:true,lazy:true})
  return {
    effect: res,
    get value(){
      return res()
    }
  }
}

// effect事件
function effect(fn,options={}){
  // 构造一个effect
  const effect = createReactiveEffect(fn,options)

  if(!options.lazy){
    effect()
  }
  return effect
}

// 生成effect
function createReactiveEffect(fn,options){
  // 定义创建effect
  const effect = function effect(...args){
      // 将其放入全局变量，方便收集依赖时获取
      if(effectStack.indexOf(effect) === -1){
        try{
          effectStack.push(effect)
          return fn(...args) // 此处获取属性会触发搜集依赖
        }finally{
          // 移除变量
          effectStack.pop()
        }
      }
  }

  // 反向依赖保存依赖它的属性
  effect.deps=[]
  effect.computed = options.computed
  effect.lazy = options.lazy
  return effect
}
```