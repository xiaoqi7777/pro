module.exports = app => {
  const {router,controller} = app
  router.get('/sg1',controller.news.index)
} 