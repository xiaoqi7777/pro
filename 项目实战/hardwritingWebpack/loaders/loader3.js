function loader1 (source){
  console.log('3333')
  return source
}
loader1.pitch = ()=>{
  console.log('loader3')
  return 'x'
}
module.exports = loader1