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
  describe('normalizeHyphen()', () => {
    test('replace hyphen check', () => {
      expect(character.normalizeHyphen('-‐—–−‒─―ｰ━')).toBe('----------');
    });
  });
  describe('repeatChar()', () => {
    test('repeat same character', () => {
      expect(character.repeatChar(',', 0)).toBe('');
      expect(character.repeatChar(',,', 1)).toBe(',,');
      expect(character.repeatChar(',', 3)).toBe(',,,');
    });
  });
  describe('toHalfWidthLetter()', () => {
    test('fullwidth to halfwidth check', () => {
      expect(character.toHalfWidthLetter('0')).toBe('0');
      expect(character.toHalfWidthLetter('￥')).toBe('￥');
      expect(character.toHalfWidthLetter('０')).toBe('0');
      expect(character.toHalfWidthLetter('　')).toBe(' ');
      expect(character.toHalfWidthLetter('ａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｒｖｗｘｙｚ')).toBe('abcdefghijklmnopqrstrvwxyz');
      expect(character.toHalfWidthLetter('０１２３４５６７８９')).toBe('0123456789');
      expect(character.toHalfWidthLetter('！＠＃＄％＾＆＾＊（）＿－＝')).toBe('!@#$%^&^*()_-=');
      expect(character.toHalfWidthLetter('［＼］｀')).toBe('[\\]`');
      expect(character.toHalfWidthLetter('｛｜｝～')).toBe('{|}~');
    });
  });
  describe('toFullWidthLetter()', () => {
    test('halfwidth to fullwidth check', () => {
      expect(character.toFullWidthLetter('０')).toBe('０');
      expect(character.toFullWidthLetter('￥')).toBe('￥');
      expect(character.toFullWidthLetter('0')).toBe('０');
      expect(character.toFullWidthLetter(' ')).toBe('　');
      expect(character.toFullWidthLetter('abcdefghijklmnopqrstrvwxyz')).toBe('ａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｒｖｗｘｙｚ');
      expect(character.toFullWidthLetter('0123456789')).toBe('０１２３４５６７８９');
      expect(character.toFullWidthLetter('!@#$%^&^*()_-=')).toBe('！＠＃＄％＾＆＾＊（）＿－＝');
      expect(character.toFullWidthLetter('[\\]`')).toBe('［＼］｀');
      expect(character.toFullWidthLetter('{|}~')).toBe('｛｜｝～');
    });
  });
  describe('toFullWidthKatakana()', () => {
    test('hankaku kana to fullwidth check', () => {
      expect(character.toFullWidthKatakana('ｱ')).toBe('ア');
      expect(character.toFullWidthKatakana('ｧｨｩｪｫ')).toBe('ァィゥェォ');
      expect(character.toFullWidthKatakana('ｯｬｭｮ')).toBe('ッャュョ');
      expect(character.toFullWidthKatakana('｡､ｰ｢｣･')).toBe('。、ー「」・');
      expect(character.toFullWidthKatakana('ｱｶｻﾀﾅﾊﾏﾔﾗﾜｦﾝ')).toBe('アカサタナハマヤラワヲン');
      expect(character.toFullWidthKatakana('ｶﾞｷﾞｸﾞｹﾞｺﾞｻﾞｼﾞｽﾞｾﾞｿﾞﾀﾞｼﾞﾂﾞﾃﾞﾄﾞﾊﾞﾋﾞﾌﾞﾍﾞﾎﾞ')).toBe('ガギグゲゴザジズゼゾダジヅデドバビブベボ');
      expect(character.toFullWidthKatakana('ﾊﾟﾋﾟﾌﾟﾍﾟﾎﾟ')).toBe('パピプペポ');
    });
    test('not hankaku kana check', () => {
      expect(character.toFullWidthKatakana('0123456789')).toBe('0123456789');
    });
  });
});
