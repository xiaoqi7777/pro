
/*
 process 有三个 nextTick(异步) env(环境变量))  argv(参数)

 process.nextTick 微任务 处理异步

 env 
    在win  设置  set  NODE_ENV(值随便取) =development(不能加双引号 空格))
           获取  process.env.NODE_ENV 
    在mac  设置  export 

*/
console.log('1233333')
// console.log(process.env.NODE_ENV)


// yargs 在执行命令时,把传递的参数解析成对象 , 可以手动将其变成对象 argv
// console.log(process.argv)
let args = process.argv.slice(2)
args = args.reduce((pre,next,current,arr)=>{
  if(next.includes('-')){
    pre[next.slice(1)] = arr[current+1]
  }
  return pre
},{})
console.log(args.p)