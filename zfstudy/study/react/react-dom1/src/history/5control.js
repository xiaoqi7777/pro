// ref用法
import React,{Component} from 'react';

import ReactDOM from 'react-dom';

class Control extends Component{
  password1 = React.createRef();
  state = {
    username : 'xiaoqi7777',
    password : '1234'
  }
  handleSubmit = (e)=>{
    e.preventDefault();
    console.log(this)
    console.log(this.password)

    // console.log(this.username.value);
  }
  handleChange = (e)=>{
    this.setState({
      [e.target.name]:e.target.value
    })
  }
  render(){
    return(
      <div>
      {/* form 会自带表单校验 */}
        <form onSubmit={this.handleSubmit}>
          <input type='text' name='username' ref={(dom) =>{
              console.log('dom',dom)
              return this.username = dom} } onChange={this.handleChange}/>
          <input type='password' name='password' ref={this.password1} onChange={this.handleChange}/>
          <button type='submit'>提交</button>
        </form>
      </div>
    )
  }
}
ReactDOM.render(<Control/>,window.root)

/*
  ref 2种用法
    第一种 ref = 'aa' (同vue)
        this.refs.aa 就是当前的dom
    第二种 
        ref = {(dom)=>this.name = dom}
          ref 执行的回调函数就是当前的dom
          用法:this.name 就可以获取找个dom
    第三种
        password = React.createRef();
        ref = {this.password}
        用法:this.password.current
        
*/



// 表单写法
// import React,{Component} from 'react';

// import ReactDOM from 'react-dom';

// class Control extends Component{
//   state = {
//     userName : 'xiaoqi7777',
//     passWord : '1234'
//   }
//   handleSubmit = (e)=>{
//     e.preventDefault();
//     console.log(JSON.stringify(this.state))
//   }
//   handleChange = (e)=>{
//     this.setState({
//       [e.target.name]:e.target.value
//     })
//   }
//   render(){
//     return(
//       <div>
//       {/* form 会自带表单校验 */}
//         <form onSubmit={this.handleSubmit}>
//           <input type='text' name='userName' value={this.state.userName} onChange={this.handleChange}/>
//           <input type='password' name='passWord' value={this.state.passWord} onChange={this.handleChange}/>
//           <button type='submit'>提交</button>
//         </form>
//       </div>
//     )
//   }

// }
// ReactDOM.render(<Control/>,window.root)
