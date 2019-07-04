  import axios from 'axios';
  import store from '../store'
  import {getLocal} from './local'
  // 当第一次请求 显示loding 剩下的时候就不调用了
  // 当都请求完毕后 隐藏loading
  class AjaxRequest{
    constructor(){
      //  请求路径
      this.baseURL = process.env.NODE_ENV == 'production'?'/':'http://localhost:3000';
      //  超时
      this.timeout = 3000;
      this.queue = {};//存放每次的请求
    }
    merge(options){
      return {...options,baseURL:this.baseURL,timeout:this.timeout}
    }
    setInterceptor(instance,url){
      // 每次请求时 都会加一个loading效果 

      // 更改请求头
      instance.interceptors.request.use(config=>{
        console.log('config',config)
        // 加请求头
        // config.headers = {
        //   'Content-Type':'application/json;charset=UTF-8'
        // }
        config.headers.Authorization=getLocal('token');
        if(Object.keys(this.queue).length === 0){
          store.commit('showLoading')
        }
        this.queue[url] = url
        return config
      })
      instance.interceptors.response.use(res=>{
        delete this.queue[url]; // 每次请求成功后 都删除队列里的路径
        if(Object.keys(this.queue).length === 0){
          store.commit('hideLoading')
        }
        return res.data
      })
    }
    request(options){
      console.log('123')
      let instance = axios.create(); // 返回axios实例
      this.setInterceptor(instance,options.url)
      let config = this.merge(options);
      return instance(config)
    }
  }


  export default new AjaxRequest

