/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1554374887744_133';

  // add your middleware config here
  config.middleware = [];
  config.mysql = {
    client: {
      host: 'localhost',
      port: 3306,
      database: 'cms',
      user: 'root',
      password: 'root',
    },
  };
  // 关闭tooken校验
  // config.security = {
  //   csrf: false,
  // };
  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  config.security = {
    csrf: false,
    domainWhiteList: [ 'http://localhost:8000' ]
  } 
  config.jwtSecret="zfpx";
  /*
    跨域传cookie(前后端允许情况下) 有一个前提 要主机名字一样
    localhost:8080 localhost:7001 可以
    localhost:8080 127.0.0.1:7001 不可以
    域名不一样就携带不了cookie
  */
  //允许client发cookie
  config.cors = {
      // origin 与 domainWhiteList一样的
      origin:"http://localhost:8000",
      credentials: true
  } 
  return {
    ...config,
    ...userConfig,
  };
};
