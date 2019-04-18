describe('character', () => {
  let character;

  beforeEach(() => {
    character = require('../config').require.jsUtils.character;
  });

  describe('escapeControlChar()', () => {
    test('escape control character', () => {
      expect(character.escapeControlChar(null)).toBe('.');
      expect(character.escapeControlChar(0)).toBe('.');
      expect(character.escapeControlChar(31)).toBe('.');
      expect(character.escapeControlChar(32)).toBe(' ');
      expect(character.escapeControlChar(126)).toBe('~');
      expect(character.escapeControlChar(127)).toBe('.');
      expect(character.escapeControlChar(128)).toBe('.');
      expect(character.escapeControlChar(160)).toBe(' ');
    });
  });
});
