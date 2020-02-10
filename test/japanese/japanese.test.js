describe('japanese', () => {
  let fs,japanese;

  beforeEach(() => {
    fs = require('fs');
    japanese = require('../../src/japanese.js');
  });

  describe('convert utf8 to utf8', () => {
    test('read standard sjis', done => {
      fs.readFile('./test/japanese/utf8.txt', (err, data) => {
        if (err) throw err;
        const stringData = japanese.convert(data, 'utf-8', 'utf-8');
        expect(stringData).toEqual('あいうえお');
        done();
      });
    });
    test('read standard sjis', done => {
      fs.readFile('./test/japanese/sjis.txt', (err, data) => {
        if (err) throw err;
        const stringData = japanese.convert(data, 'Shift_JIS', 'utf-8');
        expect(stringData).toEqual('あいうえお');
        done();
      });
    });
    test('read standard eucjp', done => {
      fs.readFile('./test/japanese/eucjp.txt', (err, data) => {
        if (err) throw err;
        const stringData = japanese.convert(data, 'eucjp', 'utf-8');
        expect(stringData).toEqual('あいうえお');
        done();
      });
    });
  });

  describe('convert from char code detected string to utf8', () => {
    test('read standard sjis', done => {
      fs.readFile('./test/japanese/sjis.txt', (err, data) => {
        if (err) throw err;
        const stringData = japanese.toUTF8(data);
        expect(stringData).toEqual('あいうえお');
        done();
      });
    });
    test('read standard eucjp', done => {
      fs.readFile('./test/japanese/eucjp.txt', (err, data) => {
        if (err) throw err;
        const stringData = japanese.toUTF8(data);
        expect(stringData).toEqual('あいうえお');
        done();
      });
    });
    test('read standard utf8', done => {
      fs.readFile('./test/japanese/utf8.txt', (err, data) => {
        if (err) throw err;
        const stringData = japanese.toUTF8(data);
        expect(stringData).toEqual('あいうえお');
        done();
      });
    });
  });
});
