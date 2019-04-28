let app = {};
app.middlewares = [];
app.use = function (cb) {
  app.middlewares.push(cb);
}
app.use((next) => {
  console.log('1');
  next();
  console.log('2');
});
app.use((next) => {
  console.log('3');
 next();
  console.log('4');
});

let fn =  app.middlewares.reduce((a,b)=>{
  return (...args)=>{
   return a(()=>b(...args))
  }
})
fn(()=>{})
// app.middlewares.reduceRight((a,b)=>{
//  return ()=>b(a)
// },()=>{})

// function dispatch(index) {
//   if(index === app.middlewares.length)  return ()=>{}
//   let route = app.middlewares[index]; // 第一次的中间件
//   route(()=>{app.middlewares[1](()=>{})})
//   // route(() => dispatch(index+1));
// }
// dispatch(0);
// let fn = app.middlewares.reduce( (a,b)=>(...args)=> a(() => b(...args)))
// fn(()=>{});
// redux compose 组合方法 reduceRight  
// let fn = app.middlewares.reduceRight((a,b)=>()=>b(a),()=>{});
// fn();
