module.exports = app => {
  const config = {}
  config.keys = 'zfpx';

  config.view = {
    defaultExtension: '.html',
    defaultViewEngine: 'nunjucks',
    mapping:{
      '.html':'nunjucks'
    }
  }

  config.news = {
    newsUrl: 'http://localhost:3000/news',
  }   

  config.middleware=[
    'robot'
  ]

  config.robot={
      ua: [
          /Chrome/
      ]
  }

  return config
}