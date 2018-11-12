describe('ajax', () => {
  let ajax, httpRequest, server;
  const access_test_url = "http://127.0.0.1:13370/";
  const response_data   = '200 OK';

  function startHttpServer() {
    const response_header = {'Content-Type': 'text/plain'};

    var http = require('http');
    server = http.createServer(function (req, res) {
      res.writeHead(200, response_header);
      res.end(response_data);
    }).listen(13370, '127.0.0.1');
  }

  beforeEach(() => {
    ajax = require('../src/ajax');
    httpRequest = ajax.init();
    startHttpServer();
  })

  describe('get()', () => {
    test('expect 200 OK', done => {
      function fetchData() {
        var ret = new Object();
        if (httpRequest.readyState == 0 || httpRequest.readyState == 1 || httpRequest.readyState == 2) {
          //document.getElementById('mapLoading').innerHTML = "読み込み中...";
        } else if (httpRequest.readyState == 4) {
          if (httpRequest.status == 200) {
            ret.data = httpRequest.responseText;
          }
          ret.status = httpRequest.status;

          expect(ret.status).toBe(200);
          server.close();
          done();
        }
      }

      ajax.setInstance(httpRequest, fetchData);
      ajax.get(httpRequest, access_test_url);
    })
  })
})
