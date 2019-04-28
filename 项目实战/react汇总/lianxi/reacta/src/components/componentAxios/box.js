import React,{Component} from 'react'
import axios from 'axios';
import Box1 from './box1';
import Box2 from './box2';
import {Provider} from './context'
//拦截发送 必须返回 config 增加token
axios.interceptors.request.use((config)=>{
    console.log('config',config)
    config.headers={
        token:'123zzzzzzzzz'
    }
    return config
})
axios.interceptors.response.use((res)=>{
                   if(res.data.code == 1){
        return res.data.data
    }
    return Promise.reject()
})


export default class Box extends Component{
    state={
        lists:[],
        total:2
    }
    //获取请求一般在 componentDidMount
    componentDidMount(){
        axios.get('/list.json').then(data=>{
            console.log('d',data)
            this.setState({
                lists:data
            })
        })
    }
    handleChange = (value) => {
        this.setState({
            total:this.state.total + value
        })
    }
    resetClick =()=>{
        this.setState({
            total:0
        })
    }
    render(){
        return (
        // Provider 在上游提供数据  consumer下面接受 提供的值必须叫value属性 
        <Provider value={{r:this.resetClick}}>
            <div>
                父传子<Box1 lists={this.state.lists} total={this.state.total}></Box1>
                子传父<Box2 fn={this.handleChange}></Box2>
             </div>
        </Provider>)
        }
}
