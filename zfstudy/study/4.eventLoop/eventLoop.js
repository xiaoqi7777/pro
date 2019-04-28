// 什么叫事件环

// 浏览器的事件环
// 进程 计算机分配任务  调度任务的最小单位
// 线程 进程里包含着线程

// JS 就是单线程(主线程时单线程的)

// JS 也可以是多线程 
// 异步都是队列
// 宏任务  setImmediate(ie下用) settimeout MessageChannel  
// 微任务  Promise MutationObserver(监听dom变化 触发事件)
// 默认先调用主栈 主栈执行完后 清空微任务，在取出宏任务队列中的第一个执行
// 并且执行完后再次清空微任务，在取第二个宏任务 环
// 宏任务  
// 微任务


// 队列 (排队一样,先进先出,Array.shift())  栈 先进后出(Array.pop())

// 执行  执行顺序是无关的 与销毁顺序有关
// function a(){
//   console.log('a')
//   function b(){
//     console.log('b')
//     function c(){
//       debugger
//       console.log('c')
    
//     }
//   }
// }

// node的事件环
// 每次都把队列清空后 或者达到执行的最大限制切换到下一个队列中会再次执行微任务
// 微任务不能递归/循环 不然无限循环
// io操作的下一个阶段是check, 所以执行的话一定走的是setImmediate
// let fs = require('fs')
// fs.readFile('worker.js','utf8',function () {
//   //后走
//   setTimeout(() => {
//     console.log('setTimeout')
//   });
//   //先走
//   setImmediate(function ( ) {
//     console.log('setImmediate')
//   })
//   })

//  宏任务 setImmediate setTimeout
//  微任务 process.nextTick(()=>{}) (类似于js的promise)
//
// class P{
//   constructor(){
//     this.arr = []
//     process.nextTick(()=>{
//       this.arr.forEach((fn)=>{
//         fn()
//       })
//     })  
//   }
//   then(fn){
//     this.arr.push(fn)
//   }
// }
// let p = new P()
//   p.then(()=>{
//     console.log('1231')
//   })
//   p.then(()=>{
//     console.log('1232')
//   })
//   p.then(()=>{
//     console.log('1233')
//   })
/*
  node合适io操作(io密集)
  异步非阻塞的

  多线程   复用线程  比如开10个 第11个等前面其中一个执行完后在走
          开一个线程就占用内存 多个线程 就是占多个内容
          会有锁的问题  2个线程 同时操作一个东西,一旦其中一个线程操作之后就会上锁,另一个暂时无法操作
          多线程 并不是同时做一件事 切换上下文(是浪费事件)) 达到同步

  单线程(node) 只有一个主线程  同过事件驱动 进行通知(epoll)
        node.js 基于Chrome V8引擎的js运行环境,让js的执行环境效率与低端的C语言相近的执行效率
      web worker 归主线程管理

*/