
// interface Speakable {
//     name:string;
//     speak():void
// }
// interface jiek{
//     age:number;
//     speak1():void
// }

// let p1:Speakable = {
//     name:'zhufeng',
//     speak(){
//         console.log('speak')
//     }
// }
// interface arr {
//     [index:number]:string
// }
// let arr1:arr = {
//     1:'2'
// }

// function createArray<T>(name:number,val:T):T[]{
//     let arr:T[]=[]
//     for(let i=0;i<name;i++){
//         arr[i] = val
//     }
//     return arr;
// }
// console.log(createArray<number>(3,2))

function sawp([a,b]:[string,number]):void{
    console.log(a,b)
}
sawp(['1',2])
