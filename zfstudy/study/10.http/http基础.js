/*
  http版本1.1
  长连接
    每次请求的时候不会重新创建新的通道,会复用原来的通道
  管线化
    数据并发(多个请求)
  url和uri
    URI:统一资源标识符
    URL:统一资源定位符
    URN:统一资源命名符
    
    URL的格式
    http://user:pass@www.example.jp:80/dir/index.html?uid=1#ch1
    http            协议方案名
    user:pass       登陆信息(认证)
    www.example.jp  服务器地址
    80              端口
    dir/index.html  带层次的文件路径
    uid             查询字符串
    ch1             片段标识符(后端拿不到这个值)    
  状态码
    1XX(信息状态码 websocket才用)
    2XX(Success 成功状态码)
      200:正常返回
      204:返回的结果只有请求头 没有响应体
      206:分段传输
    3XX(Redirection 重定向)
      301:永久重定向
      302:临时重定向
      304:缓存
    4XX(Client Error 客户端错误状态码)
      401:没有权限
      403:登陆了 还是没有权限
      404:找不到资源
    5XX(Server Error 服务器错误状态码)
      500:服务器挂了
      503:负载均衡超标

  请求(一对)
      请求方法(post)
        get / post / put / delete / options(预发射/试探性,在跨域的时候用到) / head
      资源url (/form/entry/)
      协议版本(HTTP/1.1)

      Host: hacker.jp  请求头
      Connection: keep-alive 
      Connection-Type:application/x-www-form-urlencoded
      Content-Length:16

  响应(一对)
      协议版本号(HTTP/1.1)
      200 (状态码,服务器可以随意提供状态码)
      ok (状态码的原因短语)      






  Response Headers
    Connection:keep-alive (长连接)

*/