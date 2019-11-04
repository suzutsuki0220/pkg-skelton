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
  describe('getGcd()', () => {
    test('getGcd', () => {
      expect(value.getGcd()).toBe(0);
      expect(value.getGcd(0,0)).toBe(0);
      expect(value.getGcd(1,1)).toBe(1);
      expect(value.getGcd(10,10)).toBe(10);
      expect(value.getGcd(21,3)).toBe(3);
      expect(value.getGcd(3,21)).toBe(3);
      expect(value.getGcd(320,240)).toBe(80);
      expect(value.getGcd(640,480)).toBe(160);
      expect(value.getGcd(480,640)).toBe(160);
      expect(value.getGcd(10,11)).toBe(1);
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
  describe('percent()', () => {
    test('percent', () => {
        expect(value.percent(0, 0)).toBe(0);
        expect(value.percent(0, 100)).toBe(0);
        expect(value.percent(50, 100)).toBe(50);
        expect(value.percent(50, 100, 2)).toBe(50);
        expect(value.percent(100, 100)).toBe(100);
        expect(value.percent(1, 3)).toBe(33);
        expect(value.percent(1, 3, 1)).toBe(33.3);
        expect(value.percent(1, 3, 2)).toBe(33.33);
    });
  });
  describe('round()', () => {
    test('round', () => {
        expect(value.round(0)).toBe(0);
        expect(value.round(0.1)).toBe(0);
        expect(value.round(0.1234)).toBe(0);
        expect(value.round(0, 0)).toBe(0);
        expect(value.round(0.1, 0)).toBe(0);
        expect(value.round(0.1234, 0)).toBe(0);
        expect(value.round(1, 0)).toBe(1);
        expect(value.round(1.1, 0)).toBe(1);
        expect(value.round(1.1234, 0)).toBe(1);
        expect(value.round(2345.1234, 0)).toBe(2345);
        expect(value.round(2345.1234, 2)).toBe(2345.12);
        expect(value.round(0, 1)).toBe(0);
        expect(value.round(0.1, 1)).toBe(0.1);
        expect(value.round(0.1234, 1)).toBe(0.1);
        expect(value.round(0, 2)).toBe(0);
        expect(value.round(0.1, 2)).toBe(0.1);
        expect(value.round(0.1234, 2)).toBe(0.12);
        expect(value.round(0.1234, 10)).toBe(0.1234);
    });
  });
  describe('makeMetricPrefix()', () => {
    test('number MetricPrefix', () => {
        expect(value.makeMetricPrefix(0)).toBe('0');
        expect(value.makeMetricPrefix(1)).toBe('1');
        expect(value.makeMetricPrefix(999)).toBe('999');
        expect(value.makeMetricPrefix(1000)).toBe('1K');
        expect(value.makeMetricPrefix(999999)).toBe('999K');
        expect(value.makeMetricPrefix(1000000)).toBe('1M');
        expect(value.makeMetricPrefix(999999999)).toBe('999M');
        expect(value.makeMetricPrefix(1000000000)).toBe('1G');
        expect(value.makeMetricPrefix(999999999999)).toBe('999G');
        expect(value.makeMetricPrefix(1000000000000)).toBe('1T');
        expect(value.makeMetricPrefix(999999999999999)).toBe('999T');
        expect(value.makeMetricPrefix(1000000000000000)).toBe('1P');
    });
    test('binary MetricPrefix', () => {
        expect(value.makeMetricPrefix(0, true)).toBe('0');
        expect(value.makeMetricPrefix(1, true)).toBe('1');
        expect(value.makeMetricPrefix(1023, true)).toBe('1023');
        expect(value.makeMetricPrefix(1024, true)).toBe('1Ki');
        expect(value.makeMetricPrefix(1048575, true)).toBe('1023Ki');
        expect(value.makeMetricPrefix(1048576, true)).toBe('1Mi');
        expect(value.makeMetricPrefix(1073741823, true)).toBe('1023Mi');
        expect(value.makeMetricPrefix(1073741824, true)).toBe('1Gi');
        expect(value.makeMetricPrefix(1099511627775, true)).toBe('1023Gi');
        expect(value.makeMetricPrefix(1099511627776, true)).toBe('1Ti');
        expect(value.makeMetricPrefix(1125899906842623, true)).toBe('1023Ti');
        expect(value.makeMetricPrefix(1125899906842624, true)).toBe('1Pi');
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
