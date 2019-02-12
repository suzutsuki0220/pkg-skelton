describe('ajax', () => {
  let ajax;
  let server = null;
  let timeout_id = NaN;
  const access_test_url = "http://127.0.0.1:13370/";
  const response_data   = '200 OK';
  var received_request;

  function stopHttpServer() {
    clearTimeout(timeout_id);  // 妥当ではないIDを渡しても効果無く例外は発生しない

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
      received_request = req;
      res.writeHead(200, response_header);
      res.end(response_data);
    }).listen(13370, '127.0.0.1');
  }

  beforeEach(() => {
    received_request = new Object();
    ajax = require('../config').require.jsUtils.ajax;
    ajax.init();
    startHttpServer();
  });

  describe('get()', () => {
    test('expect 200 OK', done => {
      function fetchData(xhr) {
        expect(received_request.method.toUpperCase()).toBe('GET');
        expect(xhr.status).toBe(200);
        stopHttpServer();
        done();
      }

      ajax.setOnSuccess(fetchData);
      ajax.setOnError(fetchData);
      ajax.get(access_test_url);
    });
    test('set customized header', done => {
      function fetchData(xhr) {
        expect(received_request.method.toUpperCase()).toBe('GET');
        expect(received_request.headers['x-customized-value']).toBe('check_ok');
        expect(xhr.status).toBe(200);
        stopHttpServer();
        done();
      }

      ajax.setRequestHeader({
        "x-customized-value": "check_ok"
      });

      ajax.setOnSuccess(fetchData);
      ajax.setOnError(fetchData);
      ajax.get(access_test_url);
    });
  });

  describe('post()', () => {
    test('expect 200 OK', done => {
      function fetchData(xhr) {
        expect(received_request.method.toUpperCase()).toBe('POST');
        expect(received_request.headers['content-type']).toBe('application/x-www-form-urlencoded');
        expect(xhr.status).toBe(200);
        stopHttpServer();
        done();
      }

      ajax.setOnSuccess(fetchData);
      ajax.setOnError(fetchData);
      ajax.post(access_test_url, null);
    });
    test('set customized header', done => {
      function fetchData(xhr) {
        expect(received_request.method.toUpperCase()).toBe('POST');
        expect(received_request.headers['content-type']).toBe('text/plain');
        expect(received_request.headers['x-customized-value']).toBe('check_ok');
        expect(xhr.status).toBe(200);
        stopHttpServer();
        done();
      }

      ajax.setRequestHeader({
        "Content-Type": "text/plain",
        "x-customized-value": "check_ok"
      });

      ajax.setOnSuccess(fetchData);
      ajax.setOnError(fetchData);
      ajax.post(access_test_url, null);
    });
  });

  describe('fail()', () => {
    test('connection fail', done => {
      function onSuccess(xhr) {
        stopHttpServer();
        expect(false).toBe(true);  // always fail
        done();
      }
      function onError(xhr) {
        stopHttpServer();
        expect(xhr.status).not.toBe(200);
        done();
      }

      ajax.setOnSuccess(onSuccess);
      ajax.setOnError(onError);
      ajax.post("http://example.invalid/", null);
//      expect(received_request.method.toUpperCase()).toBe('POST');
    });
  });
});
