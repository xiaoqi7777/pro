import React,{Component} from 'react'
import ReactDOM from 'react-dom'
import Types from './children/types'
export default class PropTypes extends Component{

    render(){
        let obj = {
            age:'132',
            sex:'男',
            // name:'小柒',
            fan:{
                a:123,
                b:'1qwe'
            },
            arr:['a'],
            number2:10000,

        }
        return (<div>
              PropTypes
              <Types  {...obj}/>
        </div>)
        }
}
