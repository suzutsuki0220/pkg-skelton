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
      expect(url.getRawParams("http://192.168.0.241:82/stocker/head.html&")).toEqual({});
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
      expect(url.getParams("http://192.168.0.241:82/stocker/head.html&")).toEqual({});
    });
  });

});
