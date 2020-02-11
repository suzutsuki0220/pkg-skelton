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
  describe('convert from string', () => {
    test('read string variable', () => {
      expect(japanese.toUTF8('')).toEqual('');
      expect(japanese.toUTF8('', 'ascii')).toEqual('');
      expect(japanese.toUTF8('hello')).toEqual('hello');
      expect(japanese.toUTF8('\xa6\xb8\xb1\x60\xa5\xce\xb0\xea\xa6\x72\xbc\xd0\xb7\xc7\xa6\x72\xc5\xe9\xaa\xed')).toEqual('次常用國字標準字體表');
      expect(japanese.toUTF8(Buffer.from([0x68, 0x65, 0x6c, 0x6c, 0x6f]), 'win1251')).toEqual('hello');
    });
  });
});
