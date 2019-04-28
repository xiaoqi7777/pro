// import React from 'react'
// import Route from './Route'
// export default function withRouter(Component){
//   return ()=>{
//     return <Route component={Component}></Route>
//   }
// }
import React from 'react'
import {Route} from './index'
export default function withRouter(Component){
  return ()=>{
    // return <Component></Component>
    return <Route path='/' component={Component}/>
  }
}