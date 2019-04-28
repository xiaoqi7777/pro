import React,{Component} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
export default class Types extends Component{
    static a = 'aaaaaaaaas'
    
    // 名字是死的  给类增加静态属性 //es7 才有的
    // defaultProps 和 父组件传递进来的 一样 都是this.props下的
    static defaultProps = {
        name:'1231'
    }
    //校验属性  只要是 this.props.下能获取到 都可以校验 (上面的name  也是)
        static propTypes = {
        age:PropTypes.string,
        name:PropTypes.string,
        sex:PropTypes.oneOf(['男','女']),
        fan:PropTypes.shape({
            a:PropTypes.number,
            b:PropTypes.string,
        }),
        //数组
        arr:PropTypes.arrayOf(PropTypes.string),
        //自定义校验
        number2(props,propName){
            //第一个是所有的this.props , propName指的就是number2
            if(props[propName]>100000){
                throw new Error('收益太低')
            }
        }
    }
    render(){
        // console.log('123',this.props)
        // console.log('123',Types.a)
        return (<div>
              types
        </div>)
        }
}

