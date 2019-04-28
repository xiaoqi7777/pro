module.exports = {
  get isSuccess(){
    return this.status == 200
  },
  get isNotFound(){
    return this.status == 404
  }
}