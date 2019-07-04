const ATTRS = 'ATTRS'
const REMOVE = 'REMOVE'
const REPLACE = 'REPLACE'
let Index = 0;

function diff(oldTree,newTree){
  let patches = {}
  let index = 0;
  // 递归树 比较后的结果放到补丁包中
  walk(oldTree,newTree,index,patches)

  return patches;
}
function diffAttr(oldAttrs,newAttrs){
  let patch = {};
  // 判断老的属性和新的属性的关系
  for(let key in oldAttrs){
    if(oldAttrs[key] !== newAttrs[key]){
      patch[key] = newAttrs[key]
    }
  }
  // 老节点没有新节点的属性
  for(let key in newAttrs){
    if(!oldAttrs.hasOwnProperty(key)){
      patch[key] = newAttrs[key];
    }
  }
  return patch;
}
function diffChildren(oldChildren,newChildren,patches){
  // 比较老的第一个和新的第一个
  oldChildren.forEach((child,idx)=>{
    // 索引不应该时index了 --------------
    // index 每次传递给walk时 index时递增的
    walk(child,newChildren[idx],++Index,patches)
  })
}
function isString(node) {
  return Object.prototype.toString.call(node) === '[object String]';
}

function walk(oldNode,newNode,index,patches){
  // 补丁包
  let currentPatch = [];
  if(!newNode){
    currentPatch.push({type:REMOVE,index})
  }else if(isString(oldNode)&&isString(newNode)){// 判断文本是否一致
    if(oldNode !== newNode){
      currentPatch.push({type:'TEXT',text:newNode})
    }
  }else if(oldNode.type === newNode.type){
    // 比较属性是否有更改
    let attrs = diffAttr(oldNode.props,newNode.props);
    if(Object.keys(attrs).length>0){
      currentPatch.push({type:ATTRS,attrs})
    }
    // 如果有儿子节点遍历儿子
    diffChildren(oldNode.children,newNode.children,patches)
  }else {
    // 说明节点被替换了
    currentPatch.push({type:REPLACE,newNode})
  }
  // 当前运输确实有补丁
  // 将原生和补丁对应起来 放到大补丁包中
  if(currentPatch.length>0){
    patches[index] = curre
    ntPatch;
    // console.log(patches)
  }
}

export default diff


/*
  对比规则
  1、当节点类型相同时 去看下属性是否相同 产生一个属性补丁包
    {type:'ARRTS',attrs:{class:'list-group'}}
  2、

  3、

*/ 


