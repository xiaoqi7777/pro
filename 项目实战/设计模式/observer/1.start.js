// 被观察者
class Star{
  constructor(name){
    this.name = name;
    this.state = '';
    // 被观察者 内部维护一个 观察者数组
    this.observers = [];//粉丝
  }
  getState(){
    return this.state
  }
  setState(state){
    this.state = state;
    this.notifyAllObservers()
  }
  // 增加一个新的观察者
  attach(observer){
    this.observers.push(observer)
  }
  // 通知所有的观察者更新自己
  notifyAllObservers(){
    if(this.observers){
      this.observers.forEach(observer=>observer.update())
    }
  }
}
// 观察者
class Fan{
  constructor(name,start){
    this.name = name;
    this.start = start
    this.start.attach(this);
  }
  update(){
    console.log(`当前颜色是 => ${this.start.getState()}`);
  }
}

let star = new Star('Angular Baby')
let f1 = new Fan('张三',star)
star.setState('绿色')

/**
 * 观察者模式 
 *  有一个被观察者和一群观察者
 *  被观察者里面有一个列表 存放所有的 观察者
 *  观察者在实例化的时候 会接收被观察者 将自己放到被观察者列表里面
 *  当被观察者数据变化 就会触发所有观察者的update方法
 * // 上下都一样
    被观察者供维护观察者的一系列方法
    观察者提供更新接口
    观察者把自己注册到被观察者里
    在被观察者发生变化时候，调用观察者的更新方法


// 观察者模式 特点
// 1、被观察者和观察者是耦合的 => 所有的观察者都放到被观察者里面的一个数组了
// 2、观察者的update动作是由被观察者来调用的


 * 场景
 *  1、promise
 *    then的时候,将里面的函数 用一个列表保存起来 
 *    等待resolve执行完成 执行列表里面的每一个函数,这样then就能拿到结构
 *  2、node evnets对象 里面 on 和 emit
 *  3、vue和react里面的声明 周期  只有等待运行这一步的时候(事件触发的时候) 才会取调用
 */ 



 /**
  * 发布订阅模式 
  *   订阅者  调度中心  发布者  (3者)
  *   订阅者把自己想订阅的事件注册到调度中心
  *   当该事件触发时候，发布者发布该事件到调度中心,由调度中心统一调度订阅者注册到调度中心的处理代码。

    特点:解耦

  // 观察者模式 和 发布订阅 区别
     1、观察者模式的订阅者与发布者之间是存在依赖的，而发布/订阅模式则不会。
     2、关系不一样
  */