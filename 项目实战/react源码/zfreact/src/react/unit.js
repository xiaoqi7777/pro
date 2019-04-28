





import $ from 'jquery';

class Unit{
    constructor(element){
        this._currentElement = element
    }
}

class ReactTextUnit extends Unit{
    getMarkup(rootId){
        this._rootId = rootId
        return `<span data-reactid="${rootId}">${this._currentElement}</span>`
    }
}

class ReactNativeUnit extends Unit{
    getMarkup(rootId){
        this._rootId = rootId
        let {type,props} = this._currentElement
        let tagStart = `<${type} data-reactid='${rootId}'`;
        let childString = '';
        let tagEnd = `</${type}>`
        for(let propKey in props){
            if(/^on[A-Z]/.test(propKey)){
                //如果匹配 就说明要绑定事件
                let eventType = propKey.slice(2).toLowerCase();
                $(document).delegate(`[data-reactid="${rootId}"]`,eventType,props[propKey])   
            }else if(propKey === 'children'){
                let children = props.children || []
                childString += children.map((item,index)=>{
                    //递归处理
                    let childReactUnit = createReactUnit(item)
                    let childMarkUp = childReactUnit.getMarkup(`${rootId}.${index}`)
                    return childMarkUp
                }).join('')
            }else{
                tagStart += (' '+propKey +'='+ props[propKey] )  
            }
        }
        // console.log('1111',tagStart+'>'++tagEnd)
        return tagStart+'>'+childString+tagEnd

    }
}
// 它是一个工厂方法,根据参数类型不同 产生不同的类型实例
function createReactUnit(element) {
    if(typeof element === 'number' || typeof element === 'string'){
        return new ReactTextUnit(element)
    }
    //{type:'button',props:{}} 说明他是一个原声dom节点
    if(typeof element === 'object' && typeof element.type === 'string'){
        return new ReactNativeUnit(element)
    }
}

export default createReactUnit




