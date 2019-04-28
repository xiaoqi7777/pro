import React,{Component} from 'react'
import ReactDOM from 'react-dom'
import {HashRouter,Route,Redirect,Switch,Link,NavLink} from 'react-router-dom'
export default class Detail extends Component{

    render(){
        console.log('--',this.props)
        return (<div>
            获取url 传递过来的值  --- {this.props.match.params.id}   
        </div>)
        }
}
