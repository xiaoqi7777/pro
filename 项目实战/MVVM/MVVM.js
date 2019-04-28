
// 观察者(发布订阅)

class Dep{
  constructor(){
    this.subs = [] //存放所有的watcher
  };
  // 订阅
  addSub(watcher){
    // 添加 watcher
    this.subs.push(watcher)
  }
  // 发布
  notify(){
    console.log('this.subs',this.subs)
    this.subs.forEach(watcher => watcher.update())
  } 
}

class Watcher{
  constructor(vm,expr,cb){
    this.vm = vm;
    this.expr = expr;
    this.cb = cb;
    // 默认存放一个老值
    this.oldValue = this.get();
  }

  get(){
    Dep.target = this;//先把自己放在this上
    // 取值 把这个观察者 和 数据关联起来
    let value = CompileUtil.getVal(this.vm,this.expr);
    console.log('this.subs11111',this.subs)
    Dep.target = null;
    return value
  }

  update(){
    //更新操作 数据变化后 会调用观察者的update方法
    let newVal = CompileUtil.getVal(this.vm,this.expr);
    if(newVal !== this.oldValue){
      this.cb(newVal)
    }
  }
}

class Observer{ // 实现数据劫持
  constructor(data){
    this.observer(data);
  }

  observer(data){
    // 如果是对象才观察
    if(data && typeof data == 'object'){
      //如果是对象
      for(let key in data){
        this.defineReactive(data,key,data[key]);
      }
    }
  }

  defineReactive(obj,key,value){
    this.observer(value);
    let dep = new Dep();//给每个属性 都加上一个具有发布订阅的功能
    Object.defineProperty(obj,key,{
      get(){
        //创建watcher时候 会去对应的内容 并且把watcher 放到全局上
        Dep.targer && dep.subs.push(Dep.target)
        return value;
      },
      set:(newVal) => {
        console.log('==',newVal)
        if(newVal != value){
          this.observer(newVal)
          value = newVal
          dep.notify();
        }
      }
    })
  }
}

class Compiler{
  constructor(el,vm){
    // 判断el 属性 是不是一个元素 
    this.el = this.isElementNode(el)?el:document.querySelector(el)
    this.vm = vm
    //把当前节点中的元素 获取到 放到内存中
    let fragment = this.node2fragment(this.el);
    
    //把节点中的内容进行替换

    //编译模板 用数据编译
    this.compile(fragment)

    //把内容塞到页面中
    this.el.appendChild(fragment)
  }

  isDirective(attrName){
    // startsWith() 方法用于检测字符串是否以指定的前缀开始。
    return attrName.startsWith('v-')
  }

  // 编译元素的
  compileElement(node){
    //获取元素属性
    let attributes = node.attributes;// 类数组
    // type='text' v-model='school.name'
    // console.log('==',{...attributes});
      //name就是v-model value 就是school.name 
    [...attributes].forEach(attr => {
      let {name,value:expr} = attr;//
      //判断是不是指令
      if(this.isDirective(name)){
        let [,directive] = name.split('-');
        
        //需要调用不同的指令 来处理
        // node 当前的节点  expr是指令里面的名字  this.vm是当前传递进来的vue参数
        CompileUtil[directive](node,expr,this.vm);
        // console.log('========',node,expr,this.vm)
      }
    })

  }
  // 编译文本的
  compileText(node){
    let content = node.textContent;
    // 判断当前文件节点中的内容是否包含 {{}} 
    if(/\{\{(.+?)\}\}/.test(content)){
      // console.log(content,' 找到所有文本',node)//找到所有文本
      CompileUtil['text'](node,content,this.vm);
    }
  }
  // 核心的编译方法
  compile(node){// 用来编译内存中的dom节点
    let childNodes = node.childNodes;
    [...childNodes].forEach(child=>{
      if(this.isElementNode(child)){
        // 进来的都是元素节点
        this.compileElement(child)
        // 如果是元素的话 需要把自己传递进去 在去便利子元素
        this.compile(child)
      }else{
        this.compileText(child)
      }
    })
  }

  isElementNode(node){//判断是不是文本节点
    return node.nodeType === 1
  }
  //把节点移动到内存中
  node2fragment(node){
    //创建一个文件碎片
    let fragment = document.createDocumentFragment();
    let firstChild;
    while(firstChild = node.firstChild){
      //appendChild增加一个原来的就少一个
      fragment.appendChild(firstChild)
    }
    return fragment
  }
}

CompileUtil = {
  // 根据表达式取到对应的数据
  getVal(vm,expr){//expr格式=> vm.$data  'scholl.name'
   let arr = expr.split('.')
   let rs = vm.$data
   arr.forEach(item=>{
      rs =  rs[item]
   })
   return rs
  },
  model(node,expr,vm){
    // node节点 expr是表达式 vm是当前实例
    // 给输入框赋予value属性
    let fn = this.updater['modelUpdater']
    
    new Watcher(vm,expr,(newVal)=>{
      // 给输入框加入一个观察着
      // 如果稍后数据更新了会触发此方法,会拿新值 给输入框赋予值
      fn(node,newVal);
    })
    
    let value = this.getVal(vm,expr)
    fn(node,value)
  },
  html(){
    //
  },
  getContentValue(vm,expr){
    //遍历表达式 将内容 重新替换成一个完整的内容 返还回去
    return expr.replace(/\{\{(.+?)\}\}/g,(...args)=>{
      return this.getVal(vm,rgs[1])
    })
  },
  text(node,expr,vm){
      let fn = this.updater['textUpdater']
      // expr => {{xx}}
      let content = expr.replace(/\{\{(.+?)\}\}/g,(...args)=>{
        new Watcher(vm,args[1],()=>{
          // 给表达式每{{}}都加上观察者
          fn(node,this.getContentValue(vm,expr));//返回了一个全的字符串 
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
    htmlUpdater(){

    },
    //处理文本节点
    textUpdater(node,value){
      node.textContent = value
    }
  }
}

class Vue{
  constructor(options) {
    this.$el = options.el;
    this.$data = options.data;
    //这个根元素 存在 编译模板
    if(this.$el){
      
      //把数据 全部转换成 object.defineProperty来定义
      new Observer(this.$data)
      new Compiler(this.$el,this)
    }
  }
}