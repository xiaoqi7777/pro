/*
  进制转化
    任意进制的转化(缺点结果是一个字符串)
    let r = (0x11).toString(8)

    把别的进制转化为10进制
    let r1 = parseInt('1011',2)

    base64 要求每个字节不超过64
    意思: 一个汉字3个字节 每个字节都是8bit(最大是255) 现在255要变成64
          3*8 => 4*6
    
    Buffer 
      声明 
          Buffer.alloc(12)    声明空间为12字节
          Buffer.from(string) 通过存放数组或者字符
      方法
          slice forEach copy concat(同数组) indexOf(同数组)
          split(截取,自定义)
        slice 是浅拷贝 拷贝的是引用地址

        copy(target,targetStart,sourceStart,sourceEnd)
          例子 
            let r1 = Buffer.alloc(12)
            let r3 = Buffer.from('你')
            console.log(r3.copy(r1,0,0,3))  
        split 
          例子
            Buffer.prototype.split = function (sep) {
            let arr = []
            let len = Buffer.from(sep).length
            let offset = 0 // offset+len
            let index = this.indexOf(sep) // this.indexOf(sep,index+len)
            while(-1 != index){
              arr.push(this.slice(offset,index))
              offset = index+len
              index =  this.indexOf(sep,index+len)
            }
              arr.push(this.slice(offset))
              return arr
            }
            let r3 = Buffer.from('你x说x的x委屈').split('x')
        concat([a1,a2,a3],n)
          例子(a1等代表的是Buffer,n代表的是截取多少字节,不写就是全部)
            let a1 = Buffer.from('我')
            let a2 = Buffer.from('ni')
            let r = Buffer.concat([a1,a2],n)
    fs  
      fs方法中一般会有同步和异步两种方法 
        同步马上拿到结果,异步通过callback,并且通过error-first获取错误
      fs.readFile('./test.js','utf8',(err,data)=>{})
      fs.writeFile('./test.js',{ket:1},()=>{}) //文件不存在创建新的,若有会覆盖,内容回调toString()
        //同时操作一个文件 可能会错乱 可以排序 把所有异步操作放到队列里面依次执行
      fs.appenFile() //追加 原理就是把writeFile({flag:'a'})
      fs.copyFile()  //拷贝 他会全部读出来 在写入
      
      文件描述符
      process.stdin   0(标准输入)
      process.stdiout 1(标准输出)
      process.stderr  2(错误输出))
      fs.open('test.js','r',(err,fd)=>{})  fd就是文件描述 一个数字
      fs.read(fd,buffer,startNumber,readLength,positionNumber,(err,bytesRead)=>{})
        fd              文件描述符  
        buffer          读取到哪儿(开辟新空间  buffer = Buffer.alloc(number))
        startNumber     从buffer的哪个位置读
        readLength      读取的个数
        positionNumber  读取文件的位子(为null时，会自动计算)
        例子(这是读，写类似)
          fs.open('test.js','r',(err,fd)=>{
            let buffer = Buffer.alloc(12)
            fs.read(fd,buffer,0,2,1,(err,bytesRead)=>{
              console.log('bytesRead',bytesRead,buffer)
              fs.fsync() //最后应该调用此方法，更新内存将文件写入到磁盘中
            })
          })
  */
  