// import React, { Component } from 'react'
// import {Route,Redirect} from 'react-router-dom'

// export default function({component:Component,...rest}){
//     return <Route  {...rest} render={props=>{
//         return <Component {...props}/>
//     }
//     }> 
//     </Route>
// }

import React, { Component } from 'react'
import {Route,Redirect} from 'react-router-dom'

export default function({component:Component,...rest}){
  return <Route {...rest} render={props=>{
    return <Component {...props} />
  }}>
  </Route>
}
