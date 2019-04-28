import React, { Component } from 'react'
import MessageLeft from './MessageLeft'
import MessageRight from './MessageRight'
import axios from 'axios'
import {Provider} from './Context'
axios.interceptors.request.use(function(config){
   config.headers={
     token:'123'
   }
   return config;
})

axios.interceptors.response.use(function(res){
  if(res.data.code == 1){
    return res.data.data
  }
  return Promise.reject('异常')
})

 class MessageBox extends Component {
  state = {
    lists:[],
    total:0
  }
  async componentDidMount(){
    let lists= await axios.get('/list.json')
    // this.setState({lists}) 
    this.setState({
      lists
    })
  }
  
  add = (num)=>{
    this.setState({
      total:this.state.total+num
    })
  }
  resetClick = (val)=>{
    this.setState({
      total:0
    })
  }
  clear = ()=>{
    this.setState({
      total:0
    })
  }
  render() {
    return (
      <Provider value={{val:this.resetClick}}>
        <div>
          最外层的盒子:
          <MessageLeft list={this.state.lists} fn={this.add} clear={this.clear}/>
          <MessageRight total={this.state.total}/>
        </div>
      </Provider>

    )
  }
}

export default MessageBox
