import React,{Component} from 'react'
import ReactDOM from 'react-dom'
import {HashRouter,Route,Redirect,Switch,Link,NavLink} from 'react-router-dom'
export default class List extends Component{
    state = {
        lists : []
    }
    componentDidMount(){
        let data = JSON.parse(localStorage.getItem('users')) 
        this.setState({
            lists:data
        })
        console.log(typeof data,data)
    }
    render(){
        console.log(this.state.lists)
        return (<div>
            { this.state.lists.map((item,index)=>{
                return (<div key={index}>
                        <Link to={'/user/detail/'+item.id}> {item.name}</Link> 
                    </div>)
            })}
              List
        </div>)
        }
}
