//require表示导入包的功能
const http = require("http");
//创建一个http服务器,参数是一个回调函数,表示如果有请求进来,要做什么.
const server = http.createServer(function (request, response) {
    //request请求,response响应
    //设置http头部:响应码是200,文档类型为html,字符集是utf-8
    response.writeHead(200, {"Content-type": "text/html;charset=utf-8"});
    response.end("你好,我购买了一个IPHONE" + (1 + 2 + 3) + "s");
});

//运行服务器
server.listen(8080, "127.0.0.1");