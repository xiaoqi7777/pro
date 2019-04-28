/*

1、只能用localhost 和 https 测试 
2、创建一个manifest文件
{
  "name":"珠峰xx", //应用名称
  "short_name":"学习", // 桌面引用的名称
  "display":"standalone", // fullScreen (standalone) minimal-ui browser
  "start_url":"", // 打开时的网页
  "icons":[], // 设置桌面图片 icon 图标 修改图标需要重新添加到桌面icons:[{src,sizes,type}]
  "background_color":"#aaa", // 启动画面颜色
  "theme_color":"#aaa" // 状态栏的颜色
}
3、Service Worker
特点:
  不能访问/操作dom
  会自动休眠，不会随浏览器关闭所失效(必须手动卸载)
  离线缓存内容开发者可控
  必须在https或者localhost下使用
  所有的api都基于promise










*/