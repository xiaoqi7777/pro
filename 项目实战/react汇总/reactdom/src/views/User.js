
import React, { Component } from 'react'
import {Link,Route} from '../react-router-dom'
import Add from './Add'
import List from './List'
import Detail from './Detail'
export default class User extends Component {
  render() {
    return ( 
      <div>
        user11111111111111
        <li><Link to='/user/add'>用户添加</Link></li>
        <li><Link to='/user/list'>用户列表</Link></li>
        <div>
          <Route path='/user/add' component={Add}></Route>
          <Route path='/user/list' component={List}></Route>
          <Route path='/user/detail/:name' component={Detail}></Route>
        </div>
      </div>
    )
  }
}




// import React, { Component } from "react";
// import { Link, Route } from "react-router-dom";
// import List from "./List";
// import Add from "./Add";
// import Detail from "./Detail";

// class User extends Component {
//   render() {
//     return (
//       <div>
//         <div className="col-md-3">
//           <nav className="nav nav-stacked">
//             <li>
//               <Link to="/user/add">用户添加</Link>
//             </li>
//             <li>
//               <Link to="/user/list">用户列表</Link>
//             </li>
//           </nav>
//         </div>
//         <div  className="col-md-9">
//           <Route path="/user/add" component={Add} />
//           <Route path="/user/list" component={List} />
//           <Route path="/user/Detail/:id" component={Detail} />
          
//         </div>
//       </div>
//     );
//   }
// }

// export default User;
