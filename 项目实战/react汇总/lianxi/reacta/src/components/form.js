import React,{Component} from 'react'
import ReactDOM from 'react-dom'
export default class From extends Component{
    state ={
        userName:'张三',
        password:'123'
    }
    handleChange = (e)=>{
        //onChange 默认传递 当前e  e.target是目标元素
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    handleSubmit = (e)=>{
        e.preventDefault()
        // console.log(this.state)
    }
    render(){
        // form 里面 写了value 就要写 onChange  不然就出警告
        return (<div>
                    <form onSubmit={this.handleSubmit}>
                        帐号:<input type="text" name='userName' value={this.state.userName} onChange={this.handleChange}/>
                        <br/>
                        密码:<input type="text" name='password' value={this.state.password} onChange={this.handleChange}/>
                        <br/>
                        <button type="submit">提交</button>
                    </form> 
                </div>)
        }
}
