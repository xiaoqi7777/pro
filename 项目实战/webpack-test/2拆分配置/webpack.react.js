let path = require('path')
module.exports = {
  entry:{
    main:'./src/index.js',
  },
  output:{
    filename:'_dll_[name].js',
    path:path.resolve(__dirname,'disa'),
    libraryTarget:'var',
    library:'aa'
  }

}