

export interface Counter1{
    number:number
}


export interface Counter2{
    number:number
}

// 定义仓库的状态
export interface Store{
    counter1:Counter1,
    counter2:Counter2
}