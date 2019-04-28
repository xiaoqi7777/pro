let proto={
  // get url(){
  //   return this.req.url
  // }
}

function defineGetter(property,key){
  proto.__defineGetter__(key,function(){
    return this[property][key]
  })
}
defineGetter('request','path')
defineGetter('request','url')
defineGetter('response','body')

function defineSetter(property,key){
  proto.__defineSetter__(key,function(){
    this[property][key] = this[key]
  })
}
defineSetter('response','url')

module.exports = proto