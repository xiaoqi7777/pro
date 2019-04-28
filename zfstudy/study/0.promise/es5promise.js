
function Promise(executor){
  let self = this
  self.status = 'pending'

  executor(resolve,reject);
  
  function resolve(data){
    console.log('lail',self.status)
    if(self.status === 'pending'){
      console.log(data)
      self
    }
  }
  function reject(data){
    if(self.status === 'pending'){
      console.log(data)
    }
  }
}

module.exports = Promise