import React,{Component} from 'react'
import ReactDOM from 'react-dom'
import {HashRouter,Route,Redirect,Switch,Link,NavLink} from 'react-router-dom'
export default class Children extends Component{

    render(){
        console.log('--',this.props)
        return (<div>
           Children
        </div>)
        }
}
