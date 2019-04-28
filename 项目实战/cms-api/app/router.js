
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.post('/signup',controller.user.signup)
  router.post('/login', controller.user.login);
  router.get('/captcha', controller.user.captcha);
  

  router.get('/role/getUser',controller.role.getUser)
  router.post('/role/setUser',controller.role.setUser)

  router.get('/role/getResource',controller.role.getResource)
  router.post('/role/setResource',controller.role.setResource)


  // RESTful 风格的 URL 定义 
  router.resources('user', '/user', controller.user);
  router.resources('role', '/role', controller.role);
  router.resources('resource', '/resource', controller.resource);
  router.resources('roleResource', '/roleResource', controller.roleResource);
  router.resources('roleUser', '/roleUser', controller.roleUser);
};
