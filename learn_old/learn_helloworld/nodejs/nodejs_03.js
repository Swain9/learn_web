const http = require("http");
const url = require("url");

const server = http.createServer((req, resp) => {
    const pathname = url.parse(req.url).pathname;
    const query = url.parse(req.url).query;
    console.log(pathname);
    console.log(query);
    resp.end();
});

server.listen(8080, "127.0.0.1");