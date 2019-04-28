import React,{Component} from 'react'
import ReactDOM from 'react-dom'
export default class Add extends Component{
    inp = React.createRef()
    btn = ()=>{
        let users = JSON.parse(localStorage.getItem('users')) || []
        users.push({id:Math.random(),name:this.inp.current.value})
        localStorage.setItem('users',JSON.stringify(users))
        
        this.props.history.push('/user/list')
    }
    render(){
        return (<div>
            <input type="text" ref={this.inp}/>
            <button onClick={this.btn}>添加</button> 
        </div>)
        }
}
