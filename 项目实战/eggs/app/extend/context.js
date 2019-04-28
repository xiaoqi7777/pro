// 向context上增加一个方法,用来获取accept-language请求头
exports.language = function() {
  // this.get就是请求的内容
  return this.get('accept-language')
}