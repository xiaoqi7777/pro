
/*
  1、npm init
    touch .gitignore
  2、安装依赖
    @types开头的包都是typeScript的声明文件，可以进入node_modules/@types/XX/index.d.ts进行查看
    cnpm i react react-dom @types/react @types/react-dom react-router-dom @types/react-router-dom -S
    cnpm i webpack webpack-cli webpack-dev-server html-webpack-plugin -D
    cnpm i typescript ts-loader source-map-loader -D
    cnpm i redux react-redux @types/react-redux redux-thunk  redux-logger -S
    cnpm i connected-react-router -S
    cnpm install @types/redux-logger

    ts-loader可以让Webpack使用TypeScript的标准配置文件tsconfig.json编译TypeScript代码
    source-map-loader使用任意来自Typescript的sourcemap输出，以此通知webpack何时生成自己的sourcemaps,
    这让你在调试最终生成的文件时就好像在调试TypeScript源码一样。

  3、支持typescript
    需要生成一个tsconfig.json文件来告诉ts-loader如何编译代码TypeScript代码
    tsc --init

    outDir 指定输出目录
    sourceMap：把 ts 文件编译成 js 文件的时候，同时生成对应的sourceMap文件
    noImplicitAny：如果为true的话，TypeScript 编译器无法推断出类型时，它仍然会生成 JavaScript 文件，但是它也会报告一个错误
    module：代码规范
    target：转换成es5
    jsx：react模式会生成React.createElement，在使用前不需要再进行转换操作了，输出文件的扩展名为.js,
         如果是preserve 他会编译成jsx,jsx需要babel编译
    include：需要编译的目录

  react 写法  
    启用ts语法检查后
      导入
      import React from 'react'; 
      变成下面这种
      import * as React from 'react';
    创建store
      actions 存放我们操作行为
      reducers 通过 操作行为的类型 对我们当前的state数据进行处理
      action-types 存放类型
      index  将reducers传给redux 来监控redux
    连接store
      入口文件
        import {Provider} from 'react-redux';
        import store from './store'  
        <Provider store={store}>
        </Provider>
      子文件
        引入actions发给管理员的
        connect用来连接 最后到出的时候 要写这样的格式
        this.props 就可以获取到store 里面的东西了(action和state)
        import {connect} from 'react-redux'
        import actions from '../store/actions/counter'

        let mapStateToProps = function(state:Store):Store{
          return state
        }
        export default connect(mapStateToProps,actions)(Counter)
      store里面处理异步(放到中间件里面)
        在redux 引入
        import {createStore,applyMiddleware} from 'redux'
        import thunk from 'redux-thunk';
        打印日志
        import logger from 'redux-logger';
        放到中间件
      let store = createStore(reducers,applyMiddleware(thunk,logger))
        
      
    types 文件
      存放接口:
        接口是啥样子 你使用的时候 就要按照接口规则来
      定义接口:
        interface Store{
          number:number
        }
      使用:
        let data:Store;
        //data 就必须是一个对象 key值是number value是数字类型  
    泛型 在实例类的时候  传给他什么 他就是什么类型
        class A<T>{
            data:T
        }
        
        let a = new A<number>()
        let B = new A<String>()

      

  坑:如果报错 无法解析react 找tsconfig.json
     jsx:'react'才行  
时间  47
*/