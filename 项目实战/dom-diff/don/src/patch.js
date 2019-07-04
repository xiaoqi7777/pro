import {Element,render} from './element'

let allPathes;
let index = 0;//默认那个需要打补丁

function patch(node,patches){
  //给某个原生打补丁
  allPathes = patches;

  walk(node);
  // 给某个原生打补丁
}

// 设置属性
function setAttr(node,key,value){
  switch(key){
    case 'value'://node是一个input或者textaraea
      if(node.tagName.toUpperCase() === 'INPUT' || node.tagName.toUpperCase() === 'TEXTAREA'){
        node.value = value;
      }else{
        node.setAttribute(key,value)
      }
    break;
    case 'style':
      node.style.cssText = value;
    break;
    default:
      node.setAttribute(key,value)
    break
  }
}

function walk(node) {
  let currentPatch = allPathes[index++];
  let childNodes = node.childNodes;
  childNodes.forEach((child)=>walk(child));
  if(currentPatch){
    doPatch(node,currentPatch)
  }
}
function doPatch(node,patches){
  patches.forEach(patch=>{
    switch(patch.type){
      case 'ATTRS':
        for(let key in patch.attrs){
          let value = patch.attrs[key];
          if(value){
            setAttr(node,key,value)
          }else{
            node.removeAttribute(key);
          }
        }
      break;
      case 'TEXT':
        node.textContent = patch.text;
      break;
      case 'REPLACE':
        let newNode = (patch.newNode instanceof Element) ? render(patch.newNode) : document.createTextNode(patch.newNode);
        node.parentNode.replaceChild(newNode,node)
      break;
      case 'REMOVE':
        node.parentNode.replaceChild(node);
      break;
      
    }
  })
}
export default patch;














