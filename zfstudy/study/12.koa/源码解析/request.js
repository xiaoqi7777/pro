let url = require('url')

module.exports = {
  get url(){
    return this.req.url
  },
  get path(){
    console.log('123path')
    let {pathname} = url.parse(this.req.url,true)
    return pathname
  }
}