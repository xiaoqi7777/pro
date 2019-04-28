let express = require('express');

let app = express();

app.get('/news',function (req,res) {
    const list = [
      {title:'1231国家禁毒委新任副主任 曾卧底贩毒集团(图)',image:'https://n.sinaimg.cn/photo/transform/579/w340h239/20190402/ntyh-hvcmeux4677500.jpg',createAt:new Date()},
      {title:'123这段视频美哭外国网友：这是中国？我以为是天堂',image:'https://n.sinaimg.cn/news/transform/60/w520h340/20190402/hVRE-hvcmeux5422739.png',createAt:new Date()},
      {title:'又一款海上神器诞生 中国新款两栖攻击舰引热议',image:'https://n.sinaimg.cn/news/transform/250/w160h90/20190315/jNO_-hufnxfn6337299.jpg',createAt:new Date()},
    ]
    res.json(list)
});
app.listen(3000)