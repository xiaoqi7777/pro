// exports.keys = 'zfpx';

module.exports = app => {
  let config = {}
  config.keys = 'zfpx';//指定密钥 用来加密cookie
  config.view = { //配置模板引擎
    defaultExtension: '.html',//默认的后缀,是用来查找模板文件的位子
    defaultViewEngine: 'nunjucks',//默认的模板引擎
    mapping:{//影射 指定以什么样的模板文件后缀用什么杨的模板引擎进行渲染
      '.html':'nunjucks'
    }
  }
  config.news = {
    newsUrl : 'http://localhost:3000/news'
  }
  // 表单提交的时候 默认带csrf token 可以关掉
  config.security = {
    csrf:false,
    domainWhiteList: [ 'http://localhost:8000' ]
  }
  // 当maxAge = 0的时候 请求服务器 都生成一个新的session
  //  renew 为true会自动延长有效期 
  config.session = {
    renew: false,
    key:'EGG_SESS',
    maxAge:24 * 3600 * 1000,
    httpOnly: true,
    encrypt: true
  }
  // 对应middleware下的名字 指定启用那些中间件
  config.middleware = ['robot'];
  config.robot = {
    ua:[]
      // ua:[/Chrome/]
  }
  return config;
}