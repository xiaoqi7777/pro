function loader1 (source){
  console.log('2222')
  return source
}
loader1.pitch = ()=>{
  console.log('loader2')
}
module.exports = loader1