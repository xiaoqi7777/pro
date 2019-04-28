// 生成器是用来生成迭代器的
// 什么是迭代器

//1、
// let likeArray = { 0: 1, 1: 2, 2: 3, length: 3, [Symbol.iterator] () {
//   let flag = false;
//   let index = 0;
//   let that = this;
//   return {
//     next(){
//       return { done: index === that.length , value: that[index++]}
//     }
//   }
// }}
// // 迭代器就是一个有next方法的对象 每次调用next都会返回一个对象 对象里有done，value, for of 必须拥有迭代器的元素才能使用
// // 默认我用...likeArray 会让迭代器执行
// let arr = [...likeArray];
// console.log(arr);




//2、
// // * 表示是一个生成器函数 一般可以配合yield使用
// let likeArray = {
//   0: 1, 1: 2, 2: 3, length: 3, [Symbol.iterator]:function*() {
//     let index = 0;
//     while (index !== this.length) {
//       yield this[index++];
//     }
//   }
// }
// // 迭代器就是一个有next方法的对象 每次调用next都会返回一个对象 对象里有done，value, for of 必须拥有迭代器的元素才能使用
// // 默认我用...likeArray 会让迭代器执行
// let arr = [...likeArray];
// console.log(arr);

// //3、
// // generator的好处就是 遇到yield 就会暂停，调用next会继续向下执行
// function * gen() {
//  let a = yield 1;
//  console.log('a',a)
//   yield 2;
//   yield 3;
//   yield 4
// }
// let it = gen();
// let flag = false
// do{
//   let {value,done} = it.next('a');
//   flag = done;
//   console.log(value);
// } while (!flag);

// //4、
function* gen() {
  let a = yield 1;
  console.log(a);
  let b = yield 2;
  console.log(b);
  let c = yield 3;
  console.log(c);
}
let it = gen();
console.log(it.next()) ; // 第一次调用next函数时传递的参数 是无效的
// 第二次next执行时传递的参数会返回给第一次yield的返回值
it.next();
console.log(it.next('aaa'));
console.log(it.next('cccccc'))

//5、 需求 读取文件 将值传给下一个 yield 依次 最后返回一个值
// let fs = require('fs');
// let bluebird = require('bluebird');
// let read = bluebird.promisify(fs.readFile);
// function * r() {
//   let age = yield read('name.txt','utf8');
//   let address = yield read(age,'utf8');
//   let r = yield read(address, 'utf8');
//   return r;
// }
// 通过 it.next() 获取到值({value,done}) 在传递给下一个

// let it = r();
// let {value,done} = it.next(); 
// value.then((data)=>{
//  let {value,done} = it.next(data);
//   value.then(function (data) {
//     let {value,done } = it.next(data);
//     value.then(function (data) {
//       console.log(data);
//     })
//   })
// })

//6、co库
// co库原来
// function co(it) {
//   return new Promise((resolve,reject)=>{
//     function next(data) {
//       let { value, done } = it.next(data);
//       if (!done) { // 如果还能继续迭代
//         // 调用这个promise，将执行的结果传递下去
//         value.then(data => {
//           next(data);
//         }, reject)
//       } else { // 迭代完成，把结果返回去即可
//         resolve(value);
//       }
//     }
//     next();
//   })
// }
// co(r()).then(data=>{
//   console.log(data);
// })