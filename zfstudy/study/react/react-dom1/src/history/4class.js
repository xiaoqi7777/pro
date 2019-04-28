import React,{Component} from 'react';
import ReactDom,{render} from 'react-dom';
import PropTypes from 'prop-types';


class Al extends Component{
  constructor(props){
    super(props);
    console.log('1',this)
  }
  static defaultProps = {
    name:'zfp1x',
  }
  static propTypes = {
    age:PropTypes.number.isRequired,
    gender:PropTypes.oneOf(['男','女']),
    postion:PropTypes.shape({
      x:PropTypes.number,
      y: PropTypes.number
    }),
    hobby :PropTypes.arrayOf(PropTypes.string),
    salary(props, propName, componentNam){
      console.log('2',props, propName, componentNam)
      if (props[propName] <= 100000){
        throw new Error('收益太低')
      }
    }
  }
  state = { // es7
    data : 1,
    count: this.props.count,
    // date: new Date().toLocaleString()  
  }
  // componentDidMount(){
  //   this.timer = setInterval(()=>{
  //     this.setState({
  //       data:new Date().toLocaleString()
  //     }) 
  //   },1000)
  // }
  handleClick = ()=>{ //es7
    //1、这种情况 只会执行最后一个
    //   但是将他们放到定时器中就 会全部执行
    this.setState({
      count: this.state.count + 1
    })
    this.setState({
      count: this.state.count + 3
    })
    this.setState({
      count: this.state.count + 20
    })

    // this.setState((prevState) => ({ count: prevState.count + 1 }));
    // this.setState((prevState) => ({ count: prevState.count + 3 }));
    // this.setState((prevState) => ({ count: prevState.count + 2 }));
    // this.setState({count:this.state.count+1},()=>{
    //   this.setState({count:this.state.count+3},()=>{
    //     this.setState({ count: this.state.count +2});
    //   });
    // });
  }
  render(){
    return (<div>
            {this.state.count}
             <button onClick = {this.handleClick}>点击</button> 
            </div>)
  }
}
let obj = {
  age:9,
  gender:'男',
  postion:{
    x:100,
    y:100
  },
  hobby:['写代码'],
  salary:1000000
}
render(<Al count={1} {...obj}></Al>,window.root)

/*
  实现一个类  Component是父类提供了一个更改自己的状态的方法
  React.Component 提供了 state
  类 里面 的this 有 context props refs state 生命周期
  
  import PropTypes from 'prop-types';
  // 需要校验属性 (校验实例上的属性)
  static propTypes = {
    age:PropTypes.number.isRequired,
    gender:PropTypes.oneOf(['男','女']),
    postion:PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number
    }),
    hobby: PropTypes.arrayOf(PropTypes.string),
    salary(props, propName, componentNam){
      // props 传递过来的所有参数 一个对象
      // propName指的是调用的函数 函数是什么propName就是什么这里是'salary'
      // 第三个是组件名字
      if (props[propName] <= 100000){
        throw new Error('收益太低')
      }
    }
  }
  state:
    this.state 是当前组件的状态 是一个对象
    this.setState 对状态里面的对象设置值 
    setState 批量更新的操作（ 并不是一直的批量更新 ）
      1、加定时器 他会批量更新 因为初次进来 他会把所有的setState执行一次 更新完后就是遇到一个更新一个
      2、也可以写成函数的形式 写成函数的形式 相当于下一个状态是依赖于上一个状态的(形参是上一个状态)
      3、或者回调(第二种是他的简写，实际都一样)
  
    static defaultProps:{
        name:'sg',
    }
    默认属性 


  生命周期 钩子函数  回调函数
  jsx元素事件 所有的属性都是 onClick格式的

   常见的绑定this的方法 1）bind 2）箭头函数 3）es7方式
  
  componentDidMount 组件加载完成后 调用setState 就会更新视图 
*/