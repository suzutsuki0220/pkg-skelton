describe('value', () => {
  let value;

  beforeEach(() => {
    value = require('../config').require.jsUtils.value;
  });

  describe('replaceNanToZero()', () => {
    test('replaceNanToZero', () => {
      expect(value.replaceNanToZero()).toBe(0);
      expect(value.replaceNanToZero(NaN)).toBe(0);
      expect(value.replaceNanToZero(null)).toBe(0);
      expect(value.replaceNanToZero('a')).toBe(0);
      expect(value.replaceNanToZero('123')).toBe(123);
      expect(value.replaceNanToZero(1)).toBe(1);
    });
  });
  describe('zeroPadding()', () => {
    test('zeroPadding', () => {
      expect(value.zeroPadding()).toBe('0');
      expect(value.zeroPadding(NaN)).toBe('0');
      expect(value.zeroPadding(NaN,0)).toBe('0');
      expect(value.zeroPadding(0,0)).toBe('0');
      expect(value.zeroPadding(1,0)).toBe('1');
      expect(value.zeroPadding(0,1)).toBe('0');
      expect(value.zeroPadding(1,1)).toBe('1');
      expect(value.zeroPadding(1,2)).toBe('01');
      expect(value.zeroPadding(0,2)).toBe('00');
      expect(value.zeroPadding(10,2)).toBe('10');
      expect(value.zeroPadding(10,3)).toBe('010');
      expect(value.zeroPadding(100,2)).toBe('100');
      expect(value.zeroPadding(100,3)).toBe('100');
      expect(value.zeroPadding(-1,0)).toBe('-1');
      expect(value.zeroPadding(-1,1)).toBe('-1');
      expect(value.zeroPadding(-1,2)).toBe('-01');
      expect(value.zeroPadding(-1,3)).toBe('-001');
      expect(value.zeroPadding(-10,1)).toBe('-10');
      expect(value.zeroPadding(-10,2)).toBe('-10');
      expect(value.zeroPadding(-10,3)).toBe('-010');
      expect(value.zeroPadding(-100,3)).toBe('-100');
      expect(value.zeroPadding('a',3)).toBe('00a');
      expect(value.zeroPadding('a0',3)).toBe('0a0');
      expect(value.zeroPadding('a00',3)).toBe('a00');
      expect(value.zeroPadding('-a',3)).toBe('-00a');
      expect(value.zeroPadding('-a0',3)).toBe('-0a0');
      expect(value.zeroPadding('-a00',3)).toBe('-a00');
      expect(value.zeroPadding('1',3)).toBe('001');
      expect(value.zeroPadding('10',3)).toBe('010');
      expect(value.zeroPadding('100',3)).toBe('100');
      expect(value.zeroPadding('-1',3)).toBe('-001');
      expect(value.zeroPadding('-10',3)).toBe('-010');
      expect(value.zeroPadding('-100',3)).toBe('-100');
    });
  });
  describe('normalize()', () => {
    test('normalize', () => {
      expect(value.normalize(NaN, 0, 10)).toBe(0);
      expect(value.normalize('a', 0, 10)).toBe(0);
      expect(value.normalize(0, 0, 10)).toBe(0);
      expect(value.normalize(5, 0, 10)).toBe(5);
      expect(value.normalize(10, 0, 10)).toBe(10);
      expect(value.normalize(-1, 0, 10)).toBe(0);
      expect(value.normalize(11, 0, 10)).toBe(10);
    });
  });
  describe('setMinMax()', () => {
    test('setMinMax', () => {
      var minmax = new Object();
      value.setMinMax(2, minmax);
      value.setMinMax(1, minmax);
      value.setMinMax(3, minmax);
      value.setMinMax(0, minmax);

      expect(minmax.min).toBe(0);
      expect(minmax.max).toBe(3);
    });
  });
  describe('replaceSeparator()', () => {
    test('replaceSeparator', () => {
      expect(value.replaceSeparator()).toBe('');
      expect(value.replaceSeparator('1')).toBe('1');
      expect(value.replaceSeparator('1,2')).toBe('1,2');
      expect(value.replaceSeparator('1 2')).toBe('1,2');
      expect(value.replaceSeparator('1\t2')).toBe('1,2');
      expect(value.replaceSeparator('1,2,3')).toBe('1,2,3');
      expect(value.replaceSeparator('1 2 3')).toBe('1,2,3');
      expect(value.replaceSeparator('1\t2\t3')).toBe('1,2,3');
      expect(value.replaceSeparator('1\t2\t3  ')).toBe('1,2,3,,');
      expect(value.replaceSeparator('1  2   3  ')).toBe('1,,2,,,3,,');
      expect(value.replaceSeparator('1,2,3\n1 2 3\n1\t2\t3\t')).toBe('1,2,3\n1,2,3\n1,2,3,');
    });
  });
  describe('fixNewLine()', () => {
    test('fixNewLine', () => {
      expect(value.fixNewLine()).toBe('');
      expect(value.fixNewLine('\r')).toBe('\n');
      expect(value.fixNewLine('\r\n')).toBe('\n');
      expect(value.fixNewLine('\n')).toBe('\n');
      expect(value.fixNewLine('\r\r\n\n')).toBe('\n\n\n');
      expect(value.fixNewLine('value')).toBe('value');
      expect(value.fixNewLine('value\nvalue')).toBe('value\nvalue');
      expect(value.fixNewLine('value\r\nvalue\r\n')).toBe('value\nvalue\n');
    });
  });
  describe('uuid()', () => {
    test('uuid', () => {
      const a = value.uuid();
      const b = value.uuid();

      expect(a.length).toBe(36);
      expect(b.length).toBe(36);
      expect(a).not.toBe(b);
    });
  });
});
