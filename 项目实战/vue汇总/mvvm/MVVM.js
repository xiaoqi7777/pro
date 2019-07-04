// 观察者 (包括发布订阅) 
class Dep{
  constructor(){
    this.subs = []; // 存放所有的watcher
  }
  // 订阅
  addSub(watcher){
    // 添加 watcher
    this.subs.push(watcher)
  }
  // 发布
  notify(){
    this.subs.forEach(watcher=>watcher.update())
  }
}
class Watcher{
  constructor(vm,expr,cb){
    this.vm = vm;
    this.expr = expr;
    this.cb = cb; 
    // 默认先存放一个老值
    this.oldVlaue = this.get()
  }
  get(){
    Dep.target = this;// 先把自己放在this上
    // 取值 把这个观察者 和 数据
    let value = CompileUtil.getVal(this.vm,this.expr);
    Dep.target = null
    return value;
  }
  update(){ //更新操作 数据变化后 会调用观察者的update方法
    let newVal = CompileUtil.getVal(this.vm,this.expr);
    if(this.oldVlaue !== newVal){
      this.cb(newVal);
    }
    
  }
}

class Observer{ //实现数据劫持
  constructor(data){
    this.Observer(data);
  }
  Observer(data){
    // 如果是对象才观察
    if(data && typeof data == 'object'){
      // 如果是对象
      for(let key in data){
        this.defineReactive(data,key,data[key]);
      }
    }
  };
  defineReactive(obj,key,value){
    this.Observer(value)
    let dep = new Dep() // 给每一个属性 都加上一个具有发布订阅的功能
    Object.defineProperty(obj,key,{
      get(){
        // 创建wathcer时 会取到对应的内容 并且把watcher放到全局上
        Dep.target && dep.addSub(Dep.target)
        return value;
      },
      set:(newVal)=>{ //{school:{name:'珠峰'}} school={}
        if(newVal != value){
          this.Observer(newVal)
          value = newVal;
          dep.notify()
        }
      }
    })
  }
}

// 基类
class Vue{
  constructor(options){
    this.$el = options.el;
    this.$data = options.data
    let computed = options.computed;
    let methods = options.methods
    //这个根元素 存在编译模板
    if(this.$el){
      // 把数据 全部转换成Object.defineProperty来定义
      new Observer(this.$data)


      // 把数据获取操作 vm上的取值操作 都代理到 vm.$data
      this.proxyVm(this.$data);

      for(let key in computed){ // 有依赖关系 数据
        console.log(key,this)
        
        Object.defineProperty(this.$data,key,{
          get:()=>{
            console.log(computed[key])
            return computed[key].call(this)
          }
        })
      };
      for(let key in methods){
        Object.defineProperty(this,key,{
          get(){
            return methods[key]
          }
        })
      }

      new Compiler(this.$el,this)
    }
  }
  proxyVm(){
    for(let key in this.$data){
      Object.defineProperty(this,key,{ //实现可以通过vm取到对应的内容
        get(){
          return this.$data[key];//进行了转换操作
        },
        set(newVal){
          this.$data[key] = newVal
        }
      })
    }
  }
}

class Compiler{
  constructor(el,vm){
    // 判断el属性 是不是一个元素 如果不是元素 那就获取他
    this.el = this.isElementNode(el) ? el : document.querySelector(el)
    // 把当前节点中的元素 获取到 放到内存中
    this.vm = vm;
    let fragment = this.node2fragment(this.el)

    // 把节点中的内容进行替换

    // 编译模板 用数据编译
    this.compiler(fragment)
    // 把内容塞到页面中
    this.el.appendChild(fragment)
  }
  isDirective(attrName){
    return attrName.startsWith('v-')
  }
  // 编译元素的 查看标签上的属性
  compilerElement(node){
    let attributes = node.attributes;
    [...attributes].forEach(attr=>{
      // type='text' v-model='school.name'
      let {name,value} = attr
      if(this.isDirective(name)){
        let [,directive] = name.split('-')
        let [directiveName,eventName] = directive.split(':')
        // 需要调用不同的指令来处理
        CompileUtil[directiveName](node,value,this.vm,eventName)
      }
    })
  }

  // 编译文本的 也就是{}
  compileText(node){
    let content =  node.textContent
    if(/\{\{(.+?)\}\}/.test(content)){
      // 文本节点
      CompileUtil['text'](node,content,this.vm)
    }
  }
  // 核心的编译方法
  compiler(node){
    //用来编译内存中的dom节点  模板只处理元素和文本
    let childNodes = node.childNodes;
    [...childNodes].forEach(child=>{
      if(this.isElementNode(child)){
        // 元素 看有没有v-model
        this.compilerElement(child);
        // 如果是元素的话 需要把自己传递进去 再去遍历子节点
        this.compiler(child)
      }else{
        // 元素 看有没有{}
        this.compileText(child);
      }
    })
  }
  isElementNode(node){// 是不是元素节点
    return node.nodeType === 1;
  }
  // 把节点移动到内存中
  node2fragment(node){
    // 创建一个文档碎片
    let fragment = document.createDocumentFragment()
    let firstChild;
    while(firstChild = node.firstChild){
      // appendChild
      fragment.appendChild(firstChild)
    }
    return fragment
  }
}
let CompileUtil = {
  // 根据表达式取到对应的数据
  getVal(vm,expr){ // vm.$data 'scholl.name'
    let rs = expr.split('.').reduce((data,current)=>{
      // console.log('current',current)
          return data[current]
      },vm.$data)
    return rs    
  },
  setValue(vm,expr,value){
    let rs = expr.split('.').reduce((data,current,index,arr)=>{
          if(arr.length-1 == index){
           return data[current] = value
          }
          return data[current]
      },vm.$data)
  },
  // 解析v-model这个指令
  model(node,expr,vm){
    // node 是节点 expr是表达式 vm是当前实例
    // 给输入框赋予value属性
    // console.log('node,expr,vm',node,expr,vm)
    let fn = this.updater['modelUpdater']
    new Watcher(vm,expr,(newVal)=>{ //给输入框加一个观察者 如果数据更新了会触发此方法 会拿新值 给输入框赋予值
      fn(node,newVal)
    })
    // v-model 数据双向绑定
    node.addEventListener('input',(e)=>{
      let value = e.target.value; //获取用户输入的内容
      this.setValue(vm,expr,value)
    })
    let value = this.getVal(vm,expr)
    fn(node,value)
  },
  html(node,expr,vm){
    let fn = this.updater['htmlUpdater']
    new Watcher(vm,expr,(newVal)=>{ //给输入框加一个观察者 如果数据更新了会触发此方法 会拿新值 给输入框赋予值
      fn(node,newVal)
    })
    let value = this.getVal(vm,expr)
    fn(node,value)
  },
  on(node,expr,vm,eventName){
    node.addEventListener(eventName,(e)=>{
      vm[expr].call(vm,e)
    })
  },
  getContentValue(vm,expr){
    // 遍历表达式 将内容 重新替换成一个完整的内容 返还回去
    return expr.replace(/\{\{(.+?)\}\}/g,(...args)=>{
        return this.getVal(vm,args[1]);
    })
  },
  text(node,expr,vm){ // expr {{a}} {{b}} {{c}}
    let fn = this.updater['textUpdater']
    let content = expr.replace(/\{\{(.+?)\}\}/g,(...args)=>{
      // 给表达式每个{{}} 都加上观察者
      new Watcher(vm,args[1],()=>{
          fn(node,this.getContentValue(vm,expr)) ; // 返回了一个全的字符串
      })
      return this.getVal(vm,args[1])
    })
    fn(node,content)
  },
  updater:{
    // 把数据插入到节点中
    modelUpdater(node,value){
      node.value = value
    },
    htmlUpdater(node,value){
      // xss攻击
      node.innerHTML = value
    },
    // 处理文本节点
    textUpdater(node,value){
      node.textContent = value
    }
  }
}

