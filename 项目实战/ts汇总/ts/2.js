"use strict";
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
var isMarried = true;
isMarried = false;
var age = 10;
var fistname = '七';
//数组两种写法
var hobbies = ['smoking', 'drinking', 'haire']; //里面只能放字符串
var numbers = [4, 5, 6];
var students = [{ name: '123' }, { name: 'ads' }];
console.log(students);
//元祖类型(tuple) 声明几个后面就写几个
var fullname = ['1', '2'];
//<string|number> 多个中的一种
var arr2 = [1];
var arr3 = [1, 's'];
//枚举
var Gender;
(function (Gender) {
    Gender[Gender["GIRL"] = 0] = "GIRL";
    Gender[Gender["BOY"] = 1] = "BOY"; //默认1
})(Gender || (Gender = {}));
console.log(Gender.BOY, Gender.GIRL);
