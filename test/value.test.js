describe('value', () => {
  let value;

  beforeEach(() => {
    value = require('../src/value');
  })

  describe('replaceNanToZero()', () => {
    test('replaceNanToZero', () => {
      expect(value.replaceNanToZero()).toBe(0);
      expect(value.replaceNanToZero(NaN)).toBe(0);
      expect(value.replaceNanToZero(null)).toBe(0);
      expect(value.replaceNanToZero(1)).toBe(1);
    })
  })
  describe('normalize()', () => {
    test('normalize', () => {
      expect(value.normalize(0, 0, 10)).toBe(0);
      expect(value.normalize(5, 0, 10)).toBe(5);
      expect(value.normalize(10, 0, 10)).toBe(10);
      expect(value.normalize(-1, 0, 10)).toBe(0);
      expect(value.normalize(11, 0, 10)).toBe(10);
    })
  })
  describe('setMinMax()', () => {
    test('setMinMax', () => {
      var minmax = new Object();
      value.setMinMax(2, minmax);
      value.setMinMax(1, minmax);
      value.setMinMax(3, minmax);
      value.setMinMax(0, minmax);

      expect(minmax.min).toBe(0);
      expect(minmax.max).toBe(3);
    })
  })
  describe('uuid()', () => {
    test('uuid', () => {
      const a = value.uuid();
      const b = value.uuid();

      expect(a.length).toBe(36);
      expect(b.length).toBe(36);
      expect(a).not.toBe(b);
    })
  })
})
