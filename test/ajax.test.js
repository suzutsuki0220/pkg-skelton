describe('ajax', () => {
  let ajax;
  const httpPort = 13370;
  const access_test_url = "http://127.0.0.1:" + httpPort + "/";
  let httpServer;

  beforeAll(() => {
    httpServer = require('./component/http-server.js');
    httpServer.start(httpPort);
  });

  afterAll(() => {
    httpServer.stop();
  });

  beforeEach(() => {
    httpServer.clearStatus();
    ajax = require('../config').require.jsUtils.ajax;
    ajax.init();
  });

  describe('get()', () => {
    test('expect 200 OK', done => {
      function fetchData(xhr) {
        const received_request = httpServer.getLastReceivedRequest();
        expect(received_request.method.toUpperCase()).toBe('GET');
        expect(xhr.status).toBe(200);
        done();
      }

      ajax.setOnSuccess(fetchData);
      ajax.setOnError(fetchData);
      ajax.get(access_test_url);
    });
    test('set customized header', done => {
      function fetchData(xhr) {
        const received_request = httpServer.getLastReceivedRequest();
        expect(received_request.method.toUpperCase()).toBe('GET');
        expect(received_request.headers['x-customized-value']).toBe('check_ok');
        expect(xhr.status).toBe(200);
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
        const received_request = httpServer.getLastReceivedRequest();
        expect(received_request.method.toUpperCase()).toBe('POST');
        expect(received_request.headers['content-type']).toBe('application/x-www-form-urlencoded');
        expect(xhr.status).toBe(200);
        done();
      }

      ajax.setOnSuccess(fetchData);
      ajax.setOnError(fetchData);
      ajax.post(access_test_url, null);
    });
    test('set customized header', done => {
      function fetchData(xhr) {
        const received_request = httpServer.getLastReceivedRequest();
        expect(received_request.method.toUpperCase()).toBe('POST');
        expect(received_request.headers['content-type']).toBe('text/plain');
        expect(received_request.headers['x-customized-value']).toBe('check_ok');
        expect(xhr.status).toBe(200);
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
        expect(false).toBe(true);  // always fail
        done();
      }
      function onError(xhr) {
        expect(xhr.status).not.toBe(200);
        done();
      }

      ajax.setOnSuccess(onSuccess);
      ajax.setOnError(onError);
      ajax.post("http://127.0.0.1:4/", null);
//      expect(received_request.method.toUpperCase()).toBe('POST');
    });
  });

  describe('abort()', () => {
    test('expect 0', done => {
      function fetchData(xhr) {
        expect(xhr.status).toBe(0);
        setTimeout(function() {
            done();
        }, 1000);
      }

      ajax.setOnSuccess(fetchData);
      ajax.setOnError(fetchData);
      ajax.get(access_test_url);
      ajax.abort();
    });
  });
});
