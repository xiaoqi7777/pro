
let a:number = 1;
// let b:string = null,
let c:string = '123';

// c = null

// let roott:any = document.getElementById('root');

let a1:'string'|'number'  = 'number'
console.log('--',a1)


type a1 = (x:string,y?:string)=>void
let aa:a1 = function(firstName):string{
    console.log('==',firstName)
  return firstName
}
aa('a')