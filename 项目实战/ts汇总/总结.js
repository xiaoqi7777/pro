
/*
  typescript 是js的超集
  
  1、安装 cnpm i typescript -g

  2、编译 tsc 1.ts
  
  3、Vscode+TypeScript
      tsc --init  会生成一个配置文件
      修改  outDir:'./dist' 将编译的文件放到dist目录

      tsc 1.ts --outDir dist 将文件编译到 dist目录下
    
      自动监听:1、任务=>运行生成任务=>rsc:监视tsconfig.json 当我们修改ts文件 就会自动
              2、在package.json 配置 "start": "tsc --watch" 开启npm run start 就可以自动监听了

  ts中的基本数据类型
  string 
  number
  boolean
  undefuned
  null 
  symbol

  undefined和null是其他类型的 子类型
  例子:
  let name:string = '13'

  一、
  //数组
  let names:string[] = ['a','b'] 或者 let names2:Array<string> = ['a','b']
  
  二、
  元组(tuple) 是一个长度和类型都确定的数组
  let person:[string,number,string] = ['sda',123,'qq']
  
  三、
  枚举类型
    enum Gender
  
  any 代表任何类型

  never 是其他类型的子类型，代表不会出现的值
    作为没有返回值 的返回值的类型(一般抛异常的时候 没有返回值 就用他)
    function fn():never{} 函数不能结束，一直没有return
  viod 返回为空  函数能结束

  包装类
  基本数据类型是没有方法的
  当你在一个基本数据类型上调用方法的时候，会立刻将new成一个对象 在去调他的方法
  
  四、
  联合类型
    let name:string|number; 可以给他赋值2中类型
    默认情况下 只用name string的方法会报错
    let name :string|number
    name = 'qwe';
    console.log(name.length)
  联合值
    let level:'A'|'B'|'C' = 'A'
  可以用类型断言 加as 
    let name :string|number
    name = 'qwe';
    console.log((name as string).length)

  不同的文件之间 let 取名字 也不能相同  
  
  五、
  any 任何的值
  void 是any的反面,不能有任何值
  never 永远不会有返回值,要么无限循环,要么直接报异常

  function say():viod{}
  function sum():never{
    while(true){
      console.log(1)
    }
  }
  function multi():never{
    throw Error('ok')
    //下面不会走 就不会有返回值
  }

  六、
  函数
    function sum (a:number,b:number):number{
        return a+b
    } 
    函数表达式
    type用来定义类型别名
    type  Mytype = string|number (Mytype 就代表后面2中类型了)

    type a1 = (x:string,y:string)=>string
    let a:a1 = function(firstName,lastName){
      return firstName+lastName
    }

    可选参数(上面写了2参数 就必须传递2参数，?:标识可以选参数)
    type a1 = (x:string,y?:string)=>string
    let a:a1 = function(firstName){
      return firstName
    }
    
    默认参数值
    function ajax(url:string,methods:string='GET'){
      console.log(url,methods)
    }

    剩余参数,后面剩余的必须都是number
    function sum (prefix:string,...args:number[]){
      return prefix+args.reduce((val+item)=>val+item,0)
    }
    sum('$',1,2,3,4)

    函数的重载
    type MyType = string|number|boolean
    function getType(val:MyType):MyType{
      return val
    } 
    参数是MyType  返回的值也是MyType
      重载(先声明,指定规则  在使用)
      function double(val:string):string; 没有函数体 就是用来限制的
      function double(val:number):number;
      function double(val:any){
        if(typeof val == 'string'){
          return val
        }
        if(typeof val == 'number'){
          return val
        }
      }
      
    重载 : 一个函数参数返回值不一样 就是重载(用一个函数用法不一样)
    重写 : 子类重写父类的方法

  类中加public 
    public protected private 
    加上public之后就相对于给当前类的实例增加一个公有属性
  class p1{
      constructor(public myname:string)
  } 等价
  class p1{
      myname:string;
      readonly id:number;readonly只读属性
      constructor(myname:string)
  }

  类,抽象类不能被实例化(不能被new) 只能被继承在实例化
  抽象
    abstract clsaa Animal3{
      abstract spreak():void
    }
    继承用 extends
  
  接口 本质上是以重约束(只声明，不实现)
    1、用来描述一种对象结构或者说对象的形状
    2、用来描述一种抽象的特性集合
    一个接口可以被多个类来实现，一个类也可以实现多个接口
    一个类只能有一个父类，但是一个父类可能有多个子类，但继承

    约束对象
      inteface userInteface{
        name:string,
        age:number,
        home?:string,// home可以传可不传,
        [propName:string]:any,//未知的其他任意属性
      }
      function getUerInfo(user:userInteface):void{
        console.log('user参数就得按照 userInteface 接口来弄')
      }
    约束函数
      inteface discount{
        (price:number):number
      }
      let const:discount = function(price:number):number{
        return price
      }
    约束数组
      inteface userInteface{
        [index:number]:string //index是索引 index叫啥都可以
      }
      let arr:userInteface =['123','sss']
    约束类
      继承一般是对类用extends  子类只能继承一个父类
      实现一般是对接口用implements  子类可以实现多个接口,接口可以继承接口
      inteface Animal{
        name:string;
        speak(something:sting):void
      }
      inteface Bird(){
        fly():void
      }
      class Dog implements Animal,Bird{
        constructor(public name:string){
          this.name = name
        }
        speak(something:sting){
          console.log('小狗')
        }
        fly(){
          console.log('----------')
        }
      }
  泛型   (可写多个)
    T type的缩写
      
      function calculate<T>(value:T):T{
        return value
      }
      传的啥返回啥
      console.log(calculate('13'))

      泛型例子
      class MyArray<T>{
        private list:T[]=[]
        add(value:T){
          this.list.push(value)
        }
        max():T{
          let ret = this.list[0]
          for(let i=1;i<this.length;i++){
            if(this.list[i]>ret){
              ret = this.list[i]
            }
          } 
          return ret 
        }
      }
      let arr = new MyArray<number>()
      arr.add(1)
      arr.add(2)
      arr.add(3)
      arr.max()

      T 就是在调用函数的时候 传递进来的类型  
      function createArray<T>(name:number,val:T):T[]{
          let arr:T[]=[]
          for(let i=0;i<name;i++){
              arr[i] = val
          }
          return arr;
      }
      console.log(createArray<number>(3,2))

      使用的时候 不传递 也可以 ts会进行类型推断
*/