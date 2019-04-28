import createApp from './main';

// 服务端会调用此函数 产生一个新的app实例
export default ()=>{
  let {app} = createApp();
  return app
}
