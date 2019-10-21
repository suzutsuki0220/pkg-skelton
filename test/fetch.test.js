describe('fetch request', () => {
    const access_test_url = "http://127.0.0.1:11831/";
    let httpServer;
    let jsUtils;

    function warning(error) {
        console.warn(error);
        expect(false).toBe(true);  // test result fail
    }

    beforeAll(() => {
        jsUtils = require('../');
        httpServer = require('./component/http-server.js');
        httpServer.start(11831);
    });

    afterAll(() => {
        httpServer.stop();
    });

    beforeEach(() => {
        httpServer.clearStatus();
    });

    describe('no method assign (set default GET) / json data', () => {
        test('fetch no option', done => {
            jsUtils.fetch.request({uri: access_test_url}, function(response) {
                const request = httpServer.getLastReceivedRequest();
                expect(request.method.toUpperCase()).toBe('GET');
                expect(response).toBe('200 OK');
                done();
            }, warning);
        });
    });

    describe('GET / json data', () => {
        test('200OK parse OK', done => {
            jsUtils.fetch.request({uri: access_test_url + "json", format: "json"}, function(response) {
                const request = httpServer.getLastReceivedRequest();
                expect(request.method.toUpperCase()).toBe('GET');
                expect(response).toEqual({code: 201, data: "OK"});
                expect(httpServer.getReceivedData()).toBe('');
                done();
            }, warning);

        });
        test('200OK empty data', done => {
            jsUtils.fetch.request({uri: access_test_url + "empty", format: "json"}, null, function(error) {
                expect(error.type).toBe('invalid-json');
                done();
            });
        });
    });

    describe('GET text / text data', () => {
        test('200OK data', done => {
            jsUtils.fetch.request({uri: access_test_url, body: 'data=test', headers: {'testtest': '1234'}}, function(response) {
                const request = httpServer.getLastReceivedRequest();
                expect(request.method.toUpperCase()).toBe('GET');
                expect(request.headers).toEqual(expect.objectContaining({'testtest': '1234'}));
                expect(request.url).toBe('/?data%3Dtest');
                expect(response).toBe('200 OK');
                expect(httpServer.getReceivedData()).toBe('');
                done();
            }, warning);
        });

        test('200OK empty data', done => {
            jsUtils.fetch.request({uri: access_test_url + "empty"}, function(response) {
                const request = httpServer.getLastReceivedRequest();
                expect(request.method.toUpperCase()).toBe('GET');
                expect(response).toBe('');
                done();
            }, warning);
        });
    });

    describe('POST text / json data', () => {
        test('200OK', done => {
            jsUtils.fetch.request({
                uri: access_test_url + "json",
                method: 'POST',
                body: 'data=test',
                format: 'json'
            }, function(response) {
                const request = httpServer.getLastReceivedRequest();
                expect(request.method.toUpperCase()).toBe('POST');
                expect(request.url).toBe('/json');
                expect(response).toEqual({code: 201, data: 'OK'});
                expect(httpServer.getReceivedData()).toBe('data=test');
                done();
            }, warning);
        });
    });

    describe('POST custom header / text data', () => {
        test('200OK', done => {
            jsUtils.fetch.request({
                uri: access_test_url,
                method: 'POST',
                body: 'data=test',
                format: 'text',
                headers: {'testtest': '1234'}
            }, function(response) {
                const request = httpServer.getLastReceivedRequest();
                expect(request.method.toUpperCase()).toBe('POST');
                expect(request.headers).toEqual(expect.objectContaining({'testtest': '1234'}));
                expect(response).toBe('200 OK');
                expect(httpServer.getReceivedData()).toBe('data=test');
                done();
            }, warning);
        });
    });

    describe('fetch error case', () => {
        test('expect error sequence on 404 status', done => {
            jsUtils.fetch.request({uri: access_test_url + '404'}, function() {
                expect(false).toBe(true);
                done();
            }, function(error) {
                expect(error.message).toEqual(expect.stringMatching(/^404/));
                done();
            });
        });
    });
});
