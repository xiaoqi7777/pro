// import React,{Component} from 'react'
// import ReactDOM from 'react-dom'
// export default class  extends Component{

//     render(){
//         return (<div>
              
//         </div>)
//         }
// }


// ReactDOM.render('hello',document.getElementById('root'))
import React from './react';

function sayFn(){
    console.log('getMarkUp')
}
//<button id='sayhello'>say<b>say</b></button>
let element = React.createElement('button',{id:'sayhello',onClick:sayFn},'say',
React.createElement('b',{},'hello')
)
React.render(element,document.getElementById('root'))
// React.render('hello',document.getElementById('root'))



