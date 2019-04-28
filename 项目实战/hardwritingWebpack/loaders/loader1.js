function loader1 (source){
  console.log('1111')
  return source
}
loader1.pitch = ()=>{
  console.log('loader1')
}

module.exports = loader1