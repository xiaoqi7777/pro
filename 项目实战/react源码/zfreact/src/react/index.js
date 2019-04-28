import $ from 'jquery';
import createReactUnit from './unit';
import createElement from './element';

let React = {
    nextRootIndex:0,
    render,
    createElement
}
function render(element,container){
    // 为了以后拓展方便,定义一个工厂方法,只要传入element 里面就可以返回正确的实例
    let unitInstance = createReactUnit(element)
    // 通过实例 获取实例对应的HTML片段
    let markup = unitInstance.getMarkup(React.nextRootIndex)
    $(container).html(markup)
}

export default React;



