const redis = require('redis');
  
let client = redis.createClient(6379,'127.0.0.1')

client.on('error',(err)=>{
    console.log(err)
})
// 读取和设置 字符串
client.set('name','zfpx',redis.print)
client.get('name',redis.print)

//这里是hash 类型 操作
client.hset('person','name','zfpx',redis.print)
client.hget('person','name',redis.print)

// 列表
client.lpush('links','a',redis.print)
client.lpush('links','b',redis.print)
client.lrange('links',0,-1,redis.print)

//集合
client.sadd('tags','a',redis.print)

//如何在redis中模拟对象操作
client.hset('person','name','zfpx',redis.print)
client.hset('person','age','10',redis.print)
client.hset('person','home','beijing',redis.print)
client.hkeys('person',(err,replies)=>{
    console.log(replies)
    let person = {};
    replies.forEach(item=>{
        client.hget('person',item,(err,val)=>{
            person[item] = val;
            console.log(person);
        })
    })
})
