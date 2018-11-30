const request = require('request') //支持https 和重定向
const cheerio = require('cheerio')

function getHtml () {
    request('https://s.weibo.com/top/summary?cate=realtimehot',function(error,response,body){
        if(!error && response.statusCode == 200){
            let datas = getTopics(body)
            console.log(`========================今日微博热搜========================\n${datas}`)
        }
    });
}

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

getHtml()