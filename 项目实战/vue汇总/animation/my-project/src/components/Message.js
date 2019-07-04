import Vue from 'vue';
import MessageComponent from './Message.vue'
// 获取当前组件的实例

let getInstance = ()=>{
  let vm = new Vue({
    render:h=>h(MessageComponent)
  }).$mount(''); //会在内存中进行挂载
  document.body.appendChild(vm.$el);

  // 获取他的儿子,就一个儿子
  let component = vm.$children[0]
  return {
    add(options){
      component.add(options)
    }
  }
  // vm
}
// 单例模式
let instance;
let getInst = ()=>{ //返回一个唯一的实例
  instance = instance || getInstance()
  return instance
}
const Message = {
  info(options){
    getInst().add(options)
  },
  warn(){

  },
  success(){

  },
  error(){

  }
}

export {
  Message
}
let _Vue;
export default{
  install(Vue,options){
    // options 代表的是use的第二个参数
    if(!_Vue){
      // 防止用户多次use
      _Vue = Vue
      let $message = {}
      Object.keys(Message).forEach(type=>{
        $message[type] = Message[type];
      })
      Vue.prototype.$message = $message
    }
    Vue.mixin({
      beforeCreate() {//所有组件都增加了这个方法
        if(this.$options.info){
          this._info = this.$options.info
        }else{
          this._info = this.$parent && this.$parent._info
        }
      },
    })
  }
}