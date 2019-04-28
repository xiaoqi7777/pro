/*

	1、事件环
      
      浏览器:
        异步都是队列(队列是先进先出,栈是先进后出,主栈(非异步任务)就是执行栈里面的)
        宏任务- setImmediate(ie下用) settimeout MessageChannel  
        微任务- Promise MutationObserver(监听dom变化 触发事件)

        流程-  默认先调用主栈 主栈执行完后 清空微任务，在取出宏任务队列中的第一个执行
               并且执行完后再次清空微任务，在取第二个宏任务 环
      
      node:
        宏任务- setImmediate setTimeout
        微任务- process.nextTick(()=>{}) (类似于js的promise)
 
        流程- 每次都把队列清空后 或者达到执行的最大限制切换到下一个队列中会再次执行微任务
              微任务不能递归/循环 不然无限循环(找网上配图)

	2、process
		process.pid       node进程
		process.exit()    停止当前进程(node中断)
		process.cwd()     查找当前绝对定位的目录(vscode当前打开的文件夹和git当前文件)
		process.chdir()   暂时不会
		process.nextTick  异步跟promise差不多(里面不能递归)
		process.env.NODE_ENV  暂时不会
		process.argv      暂时不会
  
	3、path
		__dirname表示的是当前的文件所在的文件夹
		path.split()
		path.resolve(__dirname,'test.js')   这两个都一样 用来拼接地址

		path.resolve和path.join区别(第二个参数是否带/)
		path.resolve(__dirname,'/index.html') //e:\index.html
		path.join(__dirname,'/index.html') //e:\study\node\index.html

		path.extname(1123.js)               输出.js(找后缀)
		path.basename('1.min.js','.js')     输出1.min(通过后缀 找文件路径)

	4、fs(有Sync是同步  无是异步) 
		fs.accessSync('文件名字') 判断文件是否存在
		fs.readdir('m') 读取根文件下的 m文件下面的文件 返回一个数组 没有则是空数组
		fs.stat('m') 读取根文件下的 m文件的状态 返回值r
			r.size 文件的大小
			r.isDirectory() 判断文件是不是目录
			r.isFile() 判断文件是不是文件
		fs.rmdir('m') 删除m目录
		fs.unlink('m') 删除m文件
			
			fs.open('text.js','r',(err,fdr)=>{}) //打开文件
				// text.js文件  
				// 'r' 做什么  flag:'r'/'w'			
				// 回调  fdr 打开文件的标示 是一个数字
				fs.read(fdr,buf,0,bufLength,null,(err,bytesRead,data)=>{})
					//fdr 			打开文件 的一个标示
					//buf 			临时存储的一个流空间
					//0   			读取buf的开始位子
					//bufLength 读取buf的长度
					//null      文件开始读取的位子
					//回调      bytesRead参数是 实际读取的字节数
				fs.write(fdr,buf,0,bufLength,null,(err,data)=>{}) //参数同上
				fs.close(fdr)
	5、url
	   	url 模块下的parse(url,boolean) 能解析 url  boolean为true时 取到的query是一个对象(?后面的)
			let {pathname,query} = url.parse('http://www.baidu.com:8080/s?a==1',true)
			console.log(pathname,query)
			
			require('querystring').parse(str,'&@','#=') 解析str 第一个参数 是对象之前分割 第二个参数是 key 和 value分割
			let str = 'username#=123&@password#=456'
			let obj = require('querystring').parse(str,'&@','#=')		
	6、vm
      vm.runInThisContext(fn)  沙箱 fn放在一个独立的虚拟环境中
      例子
        let b = 2;
        console.log('b1',b)
        let fn = `(function a(){let b = 1;console.log('b2',b)})()`;
        let vm = require('vm');
		vm.runInThisContext(fn);
	7、buffer
		声明
			Buffer.alloc('12') 通过数组声明
			Buffer.from('我')  通过存放数组或者字符
		方法 ---跟数组类似(没有分割split)
			slice ---slice 是浅拷贝 拷贝的是引用地址 
			forEach 
			copy 
			concat(同数组) 
			indexOf(同数组)
			
			concat([a1,a2,a3],n)
				例子(a1等代表的是Buffer,n代表的是截取多少字节,不写就是全部)
					let a1 = Buffer.from('我')
					let a2 = Buffer.from('ni')
					let r = Buffer.concat([a1,a2],n)
			重写split方法
				Buffer.prototype.split = function(p){
					let arr = []
					let buf = Buffer.from(this)
					let len = Buffer.from(p).length
					let offset = 0
					let index = buf.indexOf(p)

				while(-1 != index){
					let target = this.slice(offset,index)
					arr.push(target)
					offset = len + index
					index = buf.indexOf(p,offset)
				}
					arr.push(this.slice(offset))
					return arr.toString()
				}
	8、events(事件)
		on('事件','函数')				监听
		on('newListener','函数')    	监听 用户绑定的事件
		once('事件','函数')    			监听一次
		emit('事件')    				发布
		prependListener('事件','函数')   插队到最前面
		off('事件','函数')           	 删除
		defaultMaxListeners      		事件总数
	9、util
		inherits(girl类,people类)	girl继承people原型上的方法     继承原型上的属性 公有属性(私有的不会继承)
		fn.call(obj,参数1) fn是方法 obj是对象(继承私有的) 
	10、stream
		流   并不关系整体文件大小  
		分为 可读流 写流 双工流
		读取文件时 需要用到文件的流
		let fs = require('fs')
		let rs = fs.createReadStream('./a.md',options)
			options(对象)
				flags:'r',
				encoding:null,
				autoClose:true,
				start:0,
				end:6, // 包前又包后
				highWaterMark:3 // 每次读取64k
			//默认情况下 非流动模式 如果监听了on('data')事件 就变成流动模式 
			//不停的读取文件 将文件读取完毕(最快的速度),之后触发on('end')事件
			rs.on('open',()=>{})
			rs.on('data',()=>{})
			rs.on('resume',()=>{})
			rs.on('pause',()=>{})
			rs.on('end',()=>{})
			rs.on('close',()=>{})
			rs.on('error',()=>{})
		let ws = fs.createWriteStream('1.txt',options)
			options(对象)
				flags: 'w',
				encoding: 'utf8',
				autoClose: true,
				highWaterMark: 2 // 不是代表的每次能写16k  预计我用16k来写
			ws.write(Buffer.from('1'),'utf8',()=>{})
			ws.on('drain',()=>{})//drain 只有当我们写入的内容大于我们的预期，并且被清空后才会触发事件


  循环事件处理总结
    1、异步
        用递归  函数回调，一个结束在调下一个
        不能用for 循环
			用递归 一般只考虑2层情况(第三层就是特殊情况,结束回调)
			注意回调出来的条件，一般都是只有一个的情况下在出来
			fnction next(index){
					//判断结束的条件
					//在里面回调next(给变量)
					//next(index)
          	}
          next(0)
    2、同步
        一般用for 循环
*/

