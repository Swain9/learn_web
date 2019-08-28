//require表示导入包的功能
const http = require("http");
const fs = require("fs");
//创建一个http服务器,参数是一个回调函数,表示如果有请求进来,要做什么.
const server = http.createServer(function (request, response) {
    if (request.url === "/hello") {
        fs.readFile("nodejs/html/hello.html", (err, data) => {
            if (err) throw err;
            response.writeHead(200, {"Content-type": "text/html;charset=utf-8"});
            response.end(data);
        });
    } else if (request.url === "/box") {
        fs.readFile("nodejs/html/box.html", (err, data) => {
            if (err) throw err;
            response.write(data,"utf-8",()=>{
                console.log('被刷新辣');
            });
            response.write("<script>alert('你好哟')</script>");
            response.end();
        });
    } else {
        response.writeHead(404, {"Content-type": "text/html;charset=utf-8"});
        response.end("页面不存在");
    }
});

//运行服务器
server.listen(8080, "127.0.0.1");