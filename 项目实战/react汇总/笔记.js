/*
  1、脚手架 cnpm install create-react-app -g
  2、初始化项目 create-react-app reactdom

	基础语法总结
		
	1、<Parent>xxx</Parent>
		  子组件 通过this.props.children 获取xxx
    2、<Parent number={2}>xxx</Parent>
            加{}传递的就是数值
    3、 let obj = {num:1} 组件传值
        <Parent {...obj} n='2'></Parent>
            将对象结构赋值 n后面可以接字符串 可以接对象

  生命周期
    开始
        componentWillMount 组件将要渲染
        componentDidMount  组件渲染完成
        render             开始渲染
            只要调用setState(必须赋值 最起码给一个空 this.setState({}) )  
            无论数据是否变化 都会调用render方法
    变化
        shouldComponentUpdate(nextProps,nextState)
            优化在这里做,返回ture 执行render() false不执行 
        componentDidUpdate  组件更新完成
        componentWillUpdate 组件将要更新

        componentWillReceiveProps 组件接受到了新的属性  (第一次不触发)
        componentWillUnmount  组件将要销毁 
    setState 在生命周期 开始阶段 和 将要接收新的属性调用 其他调用会无限循环
    新的              
        getSnapshotBeforeUpdate(prevProps,prevState) 组件将要更新(把以前的替换了)
            获取更新前的快照,必须有一个返回值(更新之前的属性,状态)会在componentDidUpdate第三个参数获取到
        static getDerivedStateFromProps(nextProps, prevState) 接受新的属性 (把以前的替换了)
            第一次会触发,返回的是一个新的状态,没有显示调用setstate  返回的值直接盖上去
    生命周期都是同步,获取数据 放在组件更新完成、将要更新发送都可以  反正是要渲染2次的     

    <Counter><p>123</p></Counter>
    获取组件里面的子元素 => this.props.children
    渲染 一般不用map 因为 里面可能有一个 可能都有多个最终得到的结构都不一样
    官方有个方法 React.Children.map 第一个参数是this.props.children 第二个是要渲染的内容
                {React.Children.map(this.props.children,item=>{
                    return <li>{item}</li>     
                })}

  redux 见reactdom/redux文件夹
    redux 在创建的store的时候 将reducer(管理员放进去) 默认是执行一次dispatch state会接受默认值
          在组件内是通过调用store.dispatch 修改state里面的东西 store.getState获取state里面的值

          bindActionCreators 是redux 里面的一个方法  
          function bindActionCreators(actions,dispatch){
            let obj = {}
            for(let key in actions){
                obj[key] = (...args)=>dispatch(actions[key](...args))
            }
            return obj;
          }
          作用将mapDispatchToProps里 返回的多个对象整合

  react-redux 主要把react和redux 进行连接的一个库
    在父级需要提供store 这样在每个组件中就可以不用引入store
    
    store里面处理异步(放到中间件里面)
        在redux 引入
        import {createStore,applyMiddleware} from 'redux'
        import thunk from 'redux-thunk';
        打印日志
        import logger from 'redux-logger';
        放到中间件
      let store = createStore(reducers,applyMiddleware(thunk,logger))
        
    声明:
        创建一个store 
            actions 目录下放 当前的行为(action) 专门给dispatch({type:'',count:''})//操作类型 和 数据变量
            action-types 将类型(type)集中存放起来
            reducers 目录下放 当前的reducer 处理dispatch传递过来的参数,根据type做不同的事
                index将所有的reducer合并 就事一个store
    用法:
        入口文件:
        import {Provider} from 'react-redux'
        import store from './store'
        ReactDOM.render(<Provider store={store}>
            <>
            </>
        </Provider>)
        子文件:
        import {connect} from 'react-redux'
        class Counter extend Component{}
        //返回的类进行包装
        // connect方法执行两次 后返回的是一个组件
        // 第二个参数是原组件，会把redux中的状态映射到这个组件上
        // 第一个参数mapStateToProps和mapDispatchToProps
        let mapStateToProps = (state)=>{ //store.getState()

        }
        let mapDispatchToProps = (dispatch)=>{//store.dispatch

        }
        export default connect(mapStateToProps,mapDispatchToProps)(Conuter)
  路由
		分hash #和 history h5api (刷新的时候页面不存在,一定会出现404的问题)
		npm install react-router-dom
		
		import {HashRouter as Router,Route,Switch,Redirect,Link,NavLink} from 'react-router-dom'
		基本用法
			Router 可以切换 hash 和	history  要包裹在最外面
			Route  用来声明路由的
				<Route path='/'  exact={true} component={Home}/>  
					exact={true} 是完全匹配 若是下面有二级路由不能加 
					通过Route组件渲染出来的页面 有三个属性 history,lication,match 
			Redirect 重定向  当没有匹配到路由时候的跳转
				<Redirect to='/' />
			Switch 匹配到一个后就不会在匹配了
				<Switch>
					里面包裹 Route组件 和 Redirect组件
				</Switch>
            Link 标签用来跳转的 (一般对Link和NavLink第二次包装的时候 可以在他们前面都Route 
                 标签 可以获取history,lication,match属性)
				<Link to='/'>首页</Link>
			NavLink 跟Link一样的
				只是当路由是当他被激活的时候  会加一个class='active'
                注意 to='/' 要加一个  exact={true}   不然点击别的时候 他也会加
                二级路由 不能写 exact
                
            path 和 to ="/" 最前面一定要加/
                 
			JS跳转路由	
			 	this.props.history.push('/user/list')
			路由传值
				声明
				<Route path='/user/:id'  exact={true} component={Home}/>  
				<link to={'/user/'+id}>跳转</Link>

			路由的高阶组件:将Route 用组件包装做判断而已
				1、Route 默认情况下 直接 compoment={B} 之间渲染B组件   
                2、包装 <A><A> => A组件返回一个包装后的Route 组件, 可以在里面做拦截等逻辑
                
			render component children 区别 都是用在Route组件内的
                render和children 都是返回函数 component给一个组件
                children 不管路径没有没匹配到 都会渲染 如果是当前路径 则props.match 为ture	
                    一般对NavLink做 二次处理 如果跳转的是当前 可以把active放到上级
                render 就是返回函数 
                    一般对Route 进行二次处理 如果登陆就正常返回 否则 拦截等操作
    数据:
        public/index  => localhost:300  首页
        pubilc/list.json  => localhost:list.json 获取的就是一个json 数据

    组件传递:
        1、父传子 靠属性
        2、平级   靠公共的父组件
        3、跨级(祖孙) 靠Context api   祖传子-直接传   子传祖-用回调
        ContextApi 文件
        用法: 
            创建一个文件
            import React from 'react'
            let {Provider,Consumer} = React.createContext();
            export{Provider,Consumer}

            父级提供 value是固定的
                <Provider value={{r:传递的内容}}> 父级组件 </Provider>
            子级
                <Consumer>{({r})=>{
                    return(<div>
                            <button onClick={()=>{
                                console.log('r',r)
                            }}>按键
                            </button>
                        </div>)
                }}</Consumer>

    ref =>用法
    声明
    input = React.createRef()
    绑定
    <input type='text' ref={this.input}/>
    获取
    console.log(this.input)

    path-to-regexp 把路径转换成正则
经验总结:
let a  =  {s:"123"}
function keng({s:q}){
  console.log(q) //此时q就是s的别名 为123
}
keng(a)
            */