let timeout_id = NaN;
let received_request;
let received_data;
let server = null;

function stopHttpServer() {
    clearTimeout(timeout_id);  // 妥当ではないIDを渡しても効果無く例外は発生しない

    if (server) {
        server.close();
        server = null;
    }
}

function judgeResponse(uri) {
    switch (uri) {
        case "/404":
            return {
                code: 404,
                header: {'Content-Type': 'text/plain'},
                data: 'not found'
            };
        case "/empty":
            return {
                code: 200,
                header: {}
            };
        case "/json":
            return {
                code: 201,
                header: {'Content-Type': 'application/json'},
                data: '{"code": 201, "data": "OK"}'
            };
        default:
            return {
                code: 200,
                header: {'Content-Type': 'text/plain'},
                data: '200 OK'
            };
    }
}

module.exports.start = function(port = 8889) {
    const http = require('http');
    timeout_id = setTimeout(stopHttpServer, 60000);  // 60秒以内にテストが完了しなければサーバーは停止される
    server = http.createServer(function (req, res) {
        req.on("data", chunk => {
            received_data += chunk;
        });

        const response = judgeResponse(req.url);
        received_request = req;
        res.writeHead(response.code, response.header);
        res.end(response.data);
    }).listen(port, '127.0.0.1');
};

module.exports.stop = function() {
    stopHttpServer();
};

module.exports.getLastReceivedRequest = function() {
    return received_request;
};

module.exports.getReceivedData = function() {
    return received_data;
};

module.exports.clearStatus = function() {
    received_request = new Object();
    received_data = '';
};
