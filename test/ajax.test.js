describe('ajax', () => {
  let ajax;
  let server = null;
  let timeout_id = NaN;
  const access_test_url = "http://127.0.0.1:13370/";
  const response_data   = '200 OK';

  function stopHttpServer() {
    if (server) {
      server.close();
      server = null;
    }
  }

  function startHttpServer() {
    const response_header = {'Content-Type': 'text/plain'};

    var http = require('http');
    timeout_id = setTimeout(stopHttpServer, 5000);
    server = http.createServer(function (req, res) {
      res.writeHead(200, response_header);
      res.end(response_data);
    }).listen(13370, '127.0.0.1');
  }

  beforeEach(() => {
    ajax = require('../src/ajax');
    ajax.init();
    startHttpServer();
  })

  describe('get()', () => {
    test('expect 200 OK', done => {
      function fetchData(xhr) {
        expect(xhr.status).toBe(200);
        clearTimeout(timeout_id);
        stopHttpServer();
        done();
      }

      ajax.setOnSuccess(fetchData);
      ajax.setOnError(fetchData);
      ajax.get(access_test_url);
    })
  })
})
