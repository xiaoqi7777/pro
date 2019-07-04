let Vue;
class ModuleCollection{
  constructor(options){// vuex [a,b]
    this.register([],options);
  };
  register(path,rawModule){
    // path 是个空数组 rawModule就是一个对象
    let newModule = {
      _raw:rawModule,// 对象 当前 有state getters 那个对象
      _children:{}, // 表示 他包含的模块
      state:rawModule.state //他自己模块的状态
    }
    if(path.length == 0){
      this.root = newModule; // 根
    }else{
      let parent = path.slice(0,-1).reduce((root,current)=>{
        return root._children[current];
      },this.root)
      // path[path.length-1] 取数组的最后一项
      parent._children[path[path.length-1]] = newModule
    }
    if(rawModule.modules){ // 有子模块
      forEach(rawModule.modules,(childName,module)=>{
        this.register(path.concat(childName),module)
      })
    }
  }
}
function installModule (store,rootState,path,rootModule){
  if(rootModule._raw.getters){
    forEach(rootModule._raw.getters,(getterName,getterFn)=>{
      Object.defineProperty(store.getters,getterName,{
        get:()=>{
          return getterFn(rootModule.state)
        }
      })
    })
  }
  if(rootModule._raw.actions){
    forEach(rootModule._raw.getters,(actionName,actionFn)=>{
      let entry = store.actions[actionName] || (store.actions[actionName]=[])
      entry.push(()=>{
        actionFn.call(store,store)
      })
    })
  }
  if(rootModule._raw.actions){
    forEach(rootModule._raw.getters,(mutationName,mutationFn)=>{
      let entry = store.mutations[mutationName] || (store.mutations[mutationFn]=[])
      entry.push(()=>{
        mutationFn.call(store,store)
      })
    })
  }
  forEach(rootModule._children,(childName,module)=>{
    installModule(store,rootState,path.concat(childName),module)
  })
}
class Store{ // state getters mutations actions
  constructor(options){
    let state = options.state // {count:100}
    this.getters = {}
    this.mutations = {}
    this.actions = {}
    // vue核心就借用了vue的实例 因为vue的实例数据变化 会刷新视图
    this._vm = new Vue({
      data:{
        state
      }
    });

    // 把模块之间的关系 进行整理 自己根据用户传入的参数维护了一个对象
    // root._children => a._children => b
    this.modules = new ModuleCollection(options);
    // 无论是子模块 还是孙子 所有的mutation 都是根上的

    // this 是store的实例 [] path this.modules.root
    installModule(this,state,[],this.modules.root);

    // if(options.getters){
    //   let getters = options.getters;// {newCount:fn}
    //   forEach(getters,(getterName,getterFn)=>{
    //     Object.defineProperty(this.getters,getterName,{
    //       get:()=>{
    //         return getterFn(state)
    //       }
    //     })
    //   });
    //   let mutations = options.mutations
    //   forEach(mutations,(mutationName,mutationFn)=>{
    //     // this.mutations.change = ()=>{ change(state) }
    //     this.mutations[mutationName] = ()=>{
    //       mutationFn.call(this,state)
    //     }
    //   })
    //   let actions = options.actions
    //   forEach(actions,(actionName,actionFn)=>{
    //     // this.mutations.change = ()=>{ change(state) }
    //     this.actions[actionName] = ()=>{
    //       actionFn.call(this,this)
    //     }
    //   })
    // }
    let {commit,dispatch} = this;
    this.commit = (type) => {
      commit.call(this,type)
    }
    this.dispatch = (type) => {
      dispatch.call(this,type)
    }
  }
  get state(){
    return this._vm.state
  }
  commit(type){
    this.mutations[type].forEach(fn=>fn())
  }
  dispatch(type){
    this.actions[type].forEach(fn=>fn())
  }
}
function forEach(obj,callback){
  Object.keys(obj).forEach(item=>callback(item,obj[item]))
}


let install = (_Vue) =>{
  Vue = _Vue;// 保留vue的构造函数
  // mixin 全局混入 只要组件(main也是组件)生成 beforeCreate就会执行一次
  // beforeCreate  里面的this就是获取当前组件
  Vue.mixin({ //混合
    beforeCreate() {
      // console.log(' beforeCreate 12',this.$options)
      // 我需要把跟组件中 store实例 给每个组件都增加一个$store的属性
      // 是否是跟组件
      if(this.$options && this.$options.store){
        console.log('1',this.$options.store)
        this.$store = this.$options.store
      }else{ // 子组件 store 深度优先 父->子->孙
        console.log('this.$store',this.$options.data)
        this.$store = this.$parent && this.$parent.$store
      }
    },

  })
}

export default {
  Store,
  install
}