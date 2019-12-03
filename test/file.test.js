describe('file', () => {
  let file;

  beforeEach(() => {
    file = require('../config').require.jsUtils.file;
  });

  describe('FileToBase64()', () => {
    test('FileToBase64', () => {
      expect(file.FileToBase64('./test/load_check.data')).toBe('YWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXoK');
    });
  });

  describe('Base64ToFile()', () => {
    test('Base64ToFile', () => {
      const fs = require('fs');
      const path = require('path');
      const os = require('os');

      const tmp_file = path.join(os.tmpdir(), 'b64toFile.data');
      file.Base64ToFile('YWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXoK', tmp_file);
      expect(file.load(tmp_file, 'ascii')).toBe('abcdefghijklmnopqrstuvwxyz\n');
      expect(fs.unlinkSync(tmp_file)).toBe(undefined);
    });
  });

  describe('addDataScheme()', () => {
    test('addDataScheme', () => {
      expect(file.addDataScheme('data:image/png;base64,', 'image/png', 'base64')).toBe('data:image/png;base64,');
      expect(file.addDataScheme('data:image/png;base64,iVBOR', 'image/png', 'base64')).toBe('data:image/png;base64,iVBOR');
      expect(file.addDataScheme('iVBOR', 'image/png', 'base64')).toBe('data:image/png;base64,iVBOR');
      expect(file.addDataScheme('', 'image/png', 'base64')).toBe('data:image/png;base64,');
    });
  });

  describe('removeDataScheme()', () => {
    test('removeDataScheme', () => {
      expect(file.removeDataScheme('data:image/png;base64,')).toBe('');
      expect(file.removeDataScheme('data:image/png;base64,iVBOR')).toBe('iVBOR');
      expect(file.removeDataScheme('iVBOR')).toBe('iVBOR');
      expect(file.removeDataScheme('')).toBe('');
    });
  });

  describe('isFileName()', () => {
    test('true pattern', () => {
      expect(file.isFileName(' ')).toBe(true);
      expect(file.isFileName('0123456789')).toBe(true);
      expect(file.isFileName('filename')).toBe(true);
      expect(file.isFileName('日本語')).toBe(true);
      expect(file.isFileName('０１２３４５６７８９')).toBe(true);
      expect(file.isFileName('ﾌｧｲﾙ')).toBe(true);
      expect(file.isFileName('ファイル')).toBe(true);
    });
    test('false pattern', () => {
      expect(file.isFileName()).toBe(false);
      expect(file.isFileName('')).toBe(false);
      expect(file.isFileName('1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567')).toBe(true);
      expect(file.isFileName('12345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678')).toBe(false);
      expect(file.isFileName('\n')).toBe(false);
      expect(file.isFileName('\t')).toBe(false);
    });
  });

  describe('getNameFromPath()', () => {
    test('path check', () => {
      expect(file.getNameFromPath()).toEqual({dirname: '', basename: '', filename: '', extension: ''});
      expect(file.getNameFromPath('')).toEqual({dirname: '', basename: '', filename: '', extension: ''});
      expect(file.getNameFromPath('a')).toEqual({dirname: '', basename: 'a', filename: 'a', extension: ''});
      expect(file.getNameFromPath('a.txt')).toEqual({dirname: '', basename: 'a.txt', filename: 'a', extension: 'txt'});
      expect(file.getNameFromPath('a.csv.txt')).toEqual({dirname: '', basename: 'a.csv.txt', filename: 'a.csv', extension: 'txt'});
      expect(file.getNameFromPath('/')).toEqual({dirname: '/', basename: '', filename: '', extension: ''});
      expect(file.getNameFromPath('/aa')).toEqual({dirname: '/', basename: 'aa', filename: 'aa', extension: ''});
      expect(file.getNameFromPath('/usr/bin/')).toEqual({dirname: '/usr/bin/', basename: '', filename: '', extension: ''});
      expect(file.getNameFromPath('/usr/bin/sort')).toEqual({dirname: '/usr/bin/', basename: 'sort', filename: 'sort', extension: ''});
      expect(file.getNameFromPath('include/stdio.h .h')).toEqual({dirname: 'include/', basename: 'stdio.h .h', filename: 'stdio.h ', extension: 'h'});
    });
    test('extra slash check', () => {
      expect(file.getNameFromPath('//')).toEqual({dirname: '//', basename: '', filename: '', extension: ''});
      expect(file.getNameFromPath('//aa//')).toEqual({dirname: '//aa//', basename: '', filename: '', extension: ''});
      expect(file.getNameFromPath('aa//')).toEqual({dirname: 'aa//', basename: '', filename: '', extension: ''});
      expect(file.getNameFromPath('aa//bb//')).toEqual({dirname: 'aa//bb//', basename: '', filename: '', extension: ''});
    });
    test('dot start file', () => {
      expect(file.getNameFromPath('.')).toEqual({dirname: '', basename: '.', filename: '', extension: ''});
      expect(file.getNameFromPath('..')).toEqual({dirname: '', basename: '..', filename: '.', extension: ''});
      expect(file.getNameFromPath('../..aa')).toEqual({dirname: '../', basename: '..aa', filename: '.', extension: 'aa'});
      expect(file.getNameFromPath('.bashrc')).toEqual({dirname: '', basename: '.bashrc', filename: '', extension: 'bashrc'});
      expect(file.getNameFromPath('~/.bashrc')).toEqual({dirname: '~/', basename: '.bashrc', filename: '', extension: 'bashrc'});
      expect(file.getNameFromPath('/home/user.1/.bashrc')).toEqual({dirname: '/home/user.1/', basename: '.bashrc', filename: '', extension: 'bashrc'});
    });
  });
});
