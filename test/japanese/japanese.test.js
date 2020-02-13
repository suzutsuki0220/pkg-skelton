describe('japanese', () => {
  let fs, buffer, japanese;

  beforeEach(() => {
    fs = require('fs');
    buffer = require('../../src/buffer.js');
    japanese = require('../../src/japanese.js');
  });

  describe('convert to utf8', () => {
    test('read standard utf8', done => {
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
        expect(japanese.detect(data)).toBe('Shift-JIS');
        expect(japanese.toUTF8(data)).toEqual('あいうえお');
        expect(japanese.toUTF8(buffer.toArrayBuffer(data))).toEqual('あいうえお');
        done();
      });
    });
    test('read standard eucjp', done => {
      fs.readFile('./test/japanese/eucjp.txt', (err, data) => {
        if (err) throw err;
        expect(japanese.detect(data)).toBe('EUC-JP');
        expect(japanese.toUTF8(data)).toEqual('あいうえお');
        expect(japanese.toUTF8(buffer.toArrayBuffer(data))).toEqual('あいうえお');
        done();
      });
    });
    test('read standard utf8', done => {
      fs.readFile('./test/japanese/utf8.txt', (err, data) => {
        if (err) throw err;
        expect(japanese.detect(data)).toBe('UTF-8');
        expect(japanese.toUTF8(data)).toEqual('あいうえお');
        expect(japanese.toUTF8(buffer.toArrayBuffer(data))).toEqual('あいうえお');
        done();
      });
    });
  });
  describe('convert from Buffer', () => {
    test('read Shift_JIS string', () => {
        const sjis = Buffer.from([0x82,0xa0,0x82,0xa2,0x82,0xa4,0x82,0xa6,0x82,0xa8]);
        expect(japanese.detect(sjis)).toBe('Shift-JIS');
        expect(japanese.toUTF8(sjis)).toEqual('あいうえお');
        expect(japanese.toUTF8(buffer.toArrayBuffer(sjis))).toEqual('あいうえお');
    });
    test('read eucjp string', () => {
        const eucjp = Buffer.from([0xa4,0xa2,0xa4,0xa4,0xa4,0xa6,0xa4,0xa8,0xa4,0xaa]);
        expect(japanese.detect(eucjp)).toBe('EUC-JP');
        expect(japanese.toUTF8(eucjp)).toEqual('あいうえお');
        expect(japanese.toUTF8(buffer.toArrayBuffer(eucjp))).toEqual('あいうえお');
    });
    test('read utf8 string', () => {
        const utf8 = Buffer.from([0xe3,0x81,0x82,0xe3,0x81,0x84,0xe3,0x81,0x86,0xe3,0x81,0x88,0xe3,0x81,0x8a]);
        expect(japanese.detect(utf8)).toBe('UTF-8');
        expect(japanese.toUTF8(utf8)).toEqual('あいうえお');
        expect(japanese.toUTF8(buffer.toArrayBuffer(utf8))).toEqual('あいうえお');
    });
  });
  describe('detection from string', () => {
    test('read string variable', () => {
      expect(japanese.detect('あいうえお')).toEqual('UTF-8');
      expect(japanese.detect('\xc3\xa0\xc3\xad\xc3\xa0\xc3\xa7\xc3\xa3')).toEqual('UTF-8');
//      expect(japanese.detect('\xa6\xb8\xb1\x60\xa5\xce\xb0\xea\xa6\x72\xbc\xd0\xb7\xc7\xa6\x72\xc5\xe9\xaa\xed')).toEqual('Big5');
    });
  });
  describe('convert from string', () => {
    test('read string variable', () => {
      expect(japanese.toUTF8('')).toEqual('');
      expect(japanese.toUTF8('', 'ascii')).toEqual('');
      expect(japanese.toUTF8('hello')).toEqual('hello');
      expect(japanese.toUTF8('あいうえお')).toEqual('あいうえお');
      expect(japanese.toUTF8('日本語の文字')).toEqual('日本語の文字');
//      expect(japanese.toUTF8('\xa6\xb8\xb1\x60\xa5\xce\xb0\xea\xa6\x72\xbc\xd0\xb7\xc7\xa6\x72\xc5\xe9\xaa\xed')).toEqual('次常用國字標準字體表');
      expect(japanese.toUTF8(Buffer.from([0x68, 0x65, 0x6c, 0x6c, 0x6f]), 'win1251')).toEqual('hello');
    });
  });
});
