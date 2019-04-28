import * as React from 'react';

export default class Counter extends React.Component{
  state = {
    number:0
  }
  render(){
    return(
      <div>
        <p>{this.state.number}</p>
        <button>+</button>
      </div>
    )
  }
}
// import * as React from 'react';
// export interface Props{
//     number: number
// }
// export default class Counter extends React.Component<Props>{
//     render() {
//         const {number}=this.props;
//         return (
//             <div>
//                 <p>{number}</p>
//             </div>
//         )
//     }
// }