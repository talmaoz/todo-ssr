var http = require('http');

const ansService = require('./services/ans.service')

function handleRequest(req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    ansService.getAns()
        .then(ans => {
            res.write(`ANS: ${ans.answer} `);
            res.end('Hello misterBIT\n');
        })
}

var server = http.createServer(handleRequest)


server.listen(8080, 'localhost');
console.log('Server running at http://localhost:8080/');
