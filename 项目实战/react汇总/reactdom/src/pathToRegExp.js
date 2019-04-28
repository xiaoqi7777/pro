     
let url = '/user/:id/:name'; // 匹配的路径
let str = '/user/1/2'; // 请求的路径

let pathToRegExp = require('path-to-regexp')
let keys = []
// end:false 非严格匹配  true严格匹配
// keys 用来存放 :里的参数  动态路径
let reg = pathToRegExp(url,keys,{end:true});
keys = keys.map(k => k.name);

console.log(keys) // ['id','name']
// let a = str.match(/\/user\/([A-Za-z0-9]{1,})\/([A-Za-z0-9]{1,})/)
// console.log(a)

let [,...args] = (str.match(reg))
// console.log(str.match(reg))
console.log(args) //[1,2]
// keys=['id','name']
// 通过reduce 转化成对象
// 第一次执行 memo 是{}
// 第二次执行 memo 里面添加一个'id'的key值 正好用索引取args 里面的值 返回执行下一步
// 第三次执行 对象里面继续添加key值,最后返回包装好的对象

let r = keys.reduce((memo,key,index)=>(memo[key]=args[index],memo),{})
console.log(r)



let sss = ['a','b','c','d']
let i = 4
sss.reduce((pre,next,index,target)=>{
 console.log(pre,next,index,target)     
 return i++
},{})
