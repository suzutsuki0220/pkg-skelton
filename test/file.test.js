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
});
