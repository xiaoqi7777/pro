const CACHE_NAME = 'cache_v' + 1//默认情况 sw文件变化后会重新注册serviceWorker

const CACHE_LIST = [
  '/',
  '/index.html',
  '/index.css',
  '/main.js',
  '/api/img'
] 

// 拦截用户信息
self.addEventListener('fetch',(e)=>{
  // 如果联网就发请求

  // 缓存策略 缓存优先 

  e.respondWith(
    //用什么内容返回当前内容
    fetch(e.request).catch(err=>{
      // 打开缓存 把缓存匹配到的结果匹配回去
      return caches.open(CACHE_NAME).then(
        caches=>caches.match(e.request)
      )
    })
  )
})

// 缓存 需要缓存内容
function preCache(){
  // 开启了一个缓存空间
  return caches.open(CACHE_NAME).then(cache=>{
      // 添加列表到缓存中
      return cache.addAll(CACHE_LIST)
  })
}

self.addEventListener('install',(e)=>{
  console.log('install')
  // 如果上一个 serviceWorker 不销毁 需要手动skipWating()
  e.waitUntil(
    //等待promise执行完成
    preCache()
  )  
})
function clearCache(){
  return caches.keys().then(keys=>{
    return Promise.all(keys.map(key=>{
      if(key !== CACHE_NAME){
        return caches.delete(key)
      }
    }))
  })

}

// 激活当前serviceWorker 让service立即生效 self.clients.claim()
self.addEventListener('activate',(e)=>{
  e.waitUntil(
    Promise.all([clearCache(),self.clients.claim()])
  )  
})

// 添加住屏幕 两次访问 间隔5分钟 会弹出横条
/*
  self.skipWWaiting() 白哦是强制当前处在waiting状态的server worker 进入 activate状态
  event.waitUntil() 传入一个promise为参数 等到该peomise为resolve状态为止
  self.clients.claim() 在activate事件回调中执行该方法表示取得页面的控制权,这样之后打开页面都会使用这个版本
  server worker 脚本不在控制页面,之后会被停止
*/ 