# node-crawler-weibo
一个基于nodeJS的爬虫程序
# 实例
爬取微博的热搜榜页面的数据
[微博热搜](https://s.weibo.com/top/summary?cate=realtimehot)

# 依赖
```
const request = require('request')

const cheerio = require('cheerio')
```


# 发送请求
https是nodeJS的原生模块，自身就可以用来构建服务器。 可以使用Get，来请求微博热搜的对应页面：
```
const https = require('https');

let html = ''
https.get('https://s.weibo.com/top/summary?cate=realtimehot', (res) => {
    res.on('data', (data) => {
        html += data
    });
    res.on('end', () => {
        ...
    });
}).on('error', (e) => {
    console.error(e);
});
```

这里，我使用request模块，使用起来比较简单，同时支持https和重定向。
`const request = require('request')`

[request官网](https://github.com/request/request)


```
var url = 'https://s.weibo.com/top/summary?cate=realtimehot'

// 发送Get请求
// 第一个参数:请求的完整URL,包括参数
// 第二个参数:请求结果回调函数,会传入3个参数,第一个错误,第二个响应对象,第三个请求数据

request(url,function(error,response,data){
    console.log('error:', error);
    console.log('statusCode:', response && response.statusCode);
    console.log('body:', data);
});

```

#html解析
[cheerio](https://github.com/cheeriojs/cheerio)是nodejs的抓取页面模块，为服务器特别定制的，快速、灵活、实施的jQuery核心实现。适合各种Web爬虫程序。
这样就能使用类似jQuery中的$对html信息进行操作

```
function getTopics (html) {
    let $ = cheerio.load(html);
    let topics = $("#pl_top_realtimehot tbody .td-02");
    let datas = ''
    topics.each((index, element) => {
        let title = $(element).find('a').text()
        let link = encodeURIComponent($(element).find('a').attr('href'))
        datas += `${title}\nhttps://s.weibo.com${decodeURIComponent(link)}\n\n` 
    })
    return datas
}
```
