describe('url', () => {
  let url;

  beforeEach(() => {
    url = require('../config').require.jsUtils.url;
  });

  describe('Url module normal test', () => {
    test('getQueryInUrl', () => {
      expect(url.getQueryInUrl("http://192.168.0.241:82/stocker/head.html?dir=%E5%A4%89%E6%8F%9B&file=/MjAxOS0wMy0wMl8xMjUxMzY")).toBe("dir=%E5%A4%89%E6%8F%9B&file=/MjAxOS0wMy0wMl8xMjUxMzY");
      expect(url.getQueryInUrl("")).toBe("");
      expect(url.getQueryInUrl("http://192.168.0.241:82/stocker/head.html")).toBe("");
      expect(url.getQueryInUrl("http://192.168.0.241:82/stocker/head.html?")).toBe("");
      expect(url.getQueryInUrl("http://192.168.0.241:82/stocker/head.html#")).toBe("");
      expect(url.getQueryInUrl("http://192.168.0.241:82/stocker/head.html?#")).toBe("");
      expect(url.getQueryInUrl("http://192.168.0.241:82/stocker/head.html? ")).toBe(" ");
    });
    test('getRawParams', () => {
      expect(url.getRawParams("http://192.168.0.241:82/stocker/head.html?dir=%E5%A4%89%E6%8F%9B&file=/MjAxOS0wMy0wMl8xMjUxMzY")).toEqual({dir:"%E5%A4%89%E6%8F%9B", file:"/MjAxOS0wMy0wMl8xMjUxMzY"});
      expect(url.getRawParams("http://192.168.0.241:82/stocker/head.html?dir=%E5%A4%89%E6%8F%9B&file=/MjAxOS0wMy0wMl8xMjUxMzY#section")).toEqual({dir:"%E5%A4%89%E6%8F%9B", file:"/MjAxOS0wMy0wMl8xMjUxMzY"});
      expect(url.getRawParams("http://192.168.0.241:82/stocker/head.html?dir=%E5%A4%89%E6%8F%9B&file=/MjAxOS0wMy0wMl8xMjUxMzY#")).toEqual({dir:"%E5%A4%89%E6%8F%9B", file:"/MjAxOS0wMy0wMl8xMjUxMzY"});
      expect(url.getRawParams("http://192.168.0.241:82/stocker/head.html?dir=%E5%A4%89%E6%8F%9B")).toEqual({dir:"%E5%A4%89%E6%8F%9B"});
      expect(url.getRawParams("http://192.168.0.241:82/stocker/head.html?dir=%E5%A4%89%E6%8F%9B&file=")).toEqual({dir:"%E5%A4%89%E6%8F%9B", file:""});
      expect(url.getRawParams("http://192.168.0.241:82/stocker/head.html?dir=&file=")).toEqual({dir:"", file:""});
      expect(url.getRawParams("http://192.168.0.241:82/stocker/head.html?dir=&file=#")).toEqual({dir:"", file:""});
      expect(url.getRawParams("http://192.168.0.241:82/stocker/head.html?dir=&file=#section")).toEqual({dir:"", file:""});
      expect(url.getRawParams("http://192.168.0.241:82/stocker/head.html")).toEqual({});
      expect(url.getRawParams("http://192.168.0.241:82/stocker/head.html?")).toEqual({});
      expect(url.getRawParams("http://192.168.0.241:82/stocker/head.html#")).toEqual({});
      expect(url.getRawParams("http://192.168.0.241:82/stocker/head.html?#")).toEqual({});
      expect(url.getRawParams("http://192.168.0.241:82/stocker/head.html&")).toEqual({});
    });
    test('makeQueryString', () => {
      expect(url.makeQueryString({})).toBe("");
      expect(url.makeQueryString({a: '1'})).toBe("a=1");
      expect(url.makeQueryString({a: ['1', '2']})).toBe("a=1&a=2");
      expect(url.makeQueryString({a: ['1', '2', '3']})).toBe("a=1&a=2&a=3");
      expect(url.makeQueryString({a: '1', b: '2'})).toBe("a=1&b=2");
      expect(url.makeQueryString({a: '*', b: '% ?'})).toBe("a=*&b=%25%20%3F");
      expect(url.makeQueryString({a: '日本語'})).toBe("a=%E6%97%A5%E6%9C%AC%E8%AA%9E");
    });
    test('getParams', () => {
      expect(url.getParams("http://192.168.0.241:82/stocker/head.html?dir=%E5%A4%89%E6%8F%9B&file=/MjAxOS0wMy0wMl8xMjUxMzY")).toEqual({dir:"変換", file:"/MjAxOS0wMy0wMl8xMjUxMzY"});
      expect(url.getParams("http://192.168.0.241:82/stocker/head.html?dir=%E5%A4%89%E6%8F%9B")).toEqual({dir:"変換"});
      expect(url.getParams("http://192.168.0.241:82/stocker/head.html?dir=%E5%A4%89%E6%8F%9B#section")).toEqual({dir:"変換"});
      expect(url.getParams("http://192.168.0.241:82/stocker/head.html?dir=%E5%A4%89%E6%8F%9B#")).toEqual({dir:"変換"});
      expect(url.getParams("http://192.168.0.241:82/stocker/head.html?dir=%E5%A4%89%E6%8F%9B&file=")).toEqual({dir:"変換", file:""});
      expect(url.getParams("http://192.168.0.241:82/stocker/head.html?dir=&file=")).toEqual({dir:"", file:""});
      expect(url.getParams("http://192.168.0.241:82/stocker/head.html?dir=&file=#")).toEqual({dir:"", file:""});
      expect(url.getParams("http://192.168.0.241:82/stocker/head.html?dir=&file=#section")).toEqual({dir:"", file:""});
      expect(url.getParams("http://192.168.0.241:82/stocker/head.html")).toEqual({});
      expect(url.getParams("http://192.168.0.241:82/stocker/head.html?")).toEqual({});
      expect(url.getParams("http://192.168.0.241:82/stocker/head.html#")).toEqual({});
      expect(url.getParams("http://192.168.0.241:82/stocker/head.html?#")).toEqual({});
      expect(url.getParams("http://192.168.0.241:82/stocker/head.html&")).toEqual({});
      expect(url.getParams("http://localhost/stocker/head.html?dir=dir1&dir=dir2&file=file1&file=&file=file2")).toEqual({dir:["dir1", "dir2"], file: ["file1", "", "file2"]});
    });
    test('getArrayValue', () => {
      expect(url.getArrayValue({}, '')).toEqual([]);
      expect(url.getArrayValue({}, 'key')).toEqual([]);
      expect(url.getArrayValue({key: 'string'}, '')).toEqual([]);
      expect(url.getArrayValue({key: 'string'}, 'notfound')).toEqual([]);
      expect(url.getArrayValue({key: 'string'}, 'key')).toEqual(['string']);
      expect(url.getArrayValue({key: ['string1', 'string2']}, 'key')).toEqual(['string1', 'string2']);
    });
  });
  test('apart', () => {
      expect(url.apart('')).toEqual({});
      expect(url.apart('/')).toEqual({});
      expect(url.apart('/aa/bb/cc')).toEqual({});
      expect(url.apart('example.com/aa/bb/cc')).toEqual({});
      expect(url.apart('https://192.168.10.2/')).toEqual({scheme: 'https', host: '192.168.10.2', port: NaN, path: undefined});
      expect(url.apart('https://[fe80::a1b3:125d:c1f8:4781]/')).toEqual({scheme: 'https', host: '[fe80::a1b3:125d:c1f8:4781]', port: NaN, path: undefined});
      expect(url.apart('ftp://example.com')).toEqual({scheme: 'ftp', host: 'example.com', port: NaN, path: undefined});
      expect(url.apart('http://example.com')).toEqual({scheme: 'http', host: 'example.com', port: NaN, path: undefined});
      expect(url.apart('https://example.com')).toEqual({scheme: 'https', host: 'example.com', port: NaN, path: undefined});
      expect(url.apart('https://example.com/')).toEqual({scheme: 'https', host: 'example.com', port: NaN, path: undefined});
      expect(url.apart('http://example.com/path')).toEqual({scheme: 'http', host: 'example.com', port: NaN, path: '/path'});
      expect(url.apart('http://example.com:8080')).toEqual({scheme: 'http', host: 'example.com', port: 8080, path: undefined});
      expect(url.apart('https://example.com:8443/')).toEqual({scheme: 'https', host: 'example.com', port: 8443, path: undefined});
      expect(url.apart('http://example.com:8080/path')).toEqual({scheme: 'http', host: 'example.com', port: 8080, path: '/path'});
      expect(url.apart('http://example.com:8080/aaa/bb/cc')).toEqual({scheme: 'http', host: 'example.com', port: 8080, path: '/aaa/bb/cc'});
  });
});
