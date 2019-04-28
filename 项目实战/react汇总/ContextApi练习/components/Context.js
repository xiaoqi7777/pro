// React 中跨组件传递 context Api

import React from 'react'
// 创建一个消费者和提供者
let {Provider,Consumer} = React.createContext();

export{Provider,Consumer}