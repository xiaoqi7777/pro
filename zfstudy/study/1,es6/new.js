"use strict";

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

var a = 1;

var A = function A() {
  _classCallCheck(this, A);
}; //es6 不支持  可以用属性解析器就支持
// 可以在类中 写  a=1
// 不用写constructor(){a:1}
// 如果加上static 就是类上的属性


_defineProperty(A, "b", 2);

var b = new A();
console.log(b.b);
console.log(A.b);
