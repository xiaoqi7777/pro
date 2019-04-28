/**
 * 数据类型
 * boolean 布尔类型
 * number  数字型
 * string  字符串
 * 
 * 元祖类型(tuple)
 * 
 * 枚举 enum (值比较固定,一般可以数的出来)
 * 
 */

 let isMarried:boolean = true;
 isMarried = false

 let age:number = 10

 let fistname:string = '七'

 //数组两种写法
 let hobbies:string[] = ['smoking','drinking','haire'] //里面只能放字符串
 let numbers:Array<number> = [4,5,6]
 let students:Array<object> = [{name:'123'},{name:'ads'}]
 console.log(students)

 //元祖类型(tuple) 声明几个后面就写几个
 let fullname:[string,string] = ['1','2']
 //<string|number> 多个中的一种
 let arr2:Array<string|number> = [1]
 let arr3:Array<any> = [1,'s']


 //枚举
 enum Gender{
  GIRL,//默认0 就是索引
  BOY//默认1
 }
console.log(Gender.BOY,Gender.GIRL)
 
 
