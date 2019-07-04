/*
  mobx
    思想
      应用逻辑只需要修改状态数据即可,mobx会自动渲染UI,无需人工干预
      数据变化指挥渲染对应的组件
      mobx提供机制来存储和更新应用状态供React使用
      react通过提供机制把应用状态转换为可渲染组件树并对其进行渲染
    安装
      npm i webpack webpack-cli babel-core babel-loader babel-preset-env babel-preset-react babel-preset-stage-0 babel-plugin-transform-decorators-legacy mobx mobx-react -D


*/

class C {
  p = '123';
}
console.log(C.p)