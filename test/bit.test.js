describe('bit()', () => {
  let bit;

  beforeEach(() => {
    bit = require('../src/bit.js');
  });
  describe('isMatch()', () => {
    test('check match patterns', () => {
      expect(bit.isMatch(0, 0)).toBe(false);
      expect(bit.isMatch(0, 1)).toBe(false);
      expect(bit.isMatch(0, 2)).toBe(false);
      expect(bit.isMatch(0, 4)).toBe(false);
      expect(bit.isMatch(0, 8)).toBe(false);
      expect(bit.isMatch(1, 0)).toBe(false);
      expect(bit.isMatch(1, 1)).toBe(true);
      expect(bit.isMatch(1, 2)).toBe(false);
      expect(bit.isMatch(1, 4)).toBe(false);
      expect(bit.isMatch(1, 8)).toBe(false);
      expect(bit.isMatch(2, 0)).toBe(false);
      expect(bit.isMatch(2, 1)).toBe(false);
      expect(bit.isMatch(2, 2)).toBe(true);
      expect(bit.isMatch(2, 4)).toBe(false);
      expect(bit.isMatch(2, 8)).toBe(false);
      expect(bit.isMatch(3, 0)).toBe(false);
      expect(bit.isMatch(3, 1)).toBe(true);
      expect(bit.isMatch(3, 2)).toBe(true);
      expect(bit.isMatch(3, 4)).toBe(false);
      expect(bit.isMatch(3, 8)).toBe(false);
      expect(bit.isMatch(4, 0)).toBe(false);
      expect(bit.isMatch(4, 1)).toBe(false);
      expect(bit.isMatch(4, 2)).toBe(false);
      expect(bit.isMatch(4, 4)).toBe(true);
      expect(bit.isMatch(4, 8)).toBe(false);
      expect(bit.isMatch(5, 0)).toBe(false);
      expect(bit.isMatch(5, 1)).toBe(true);
      expect(bit.isMatch(5, 2)).toBe(false);
      expect(bit.isMatch(5, 4)).toBe(true);
      expect(bit.isMatch(5, 8)).toBe(false);
      expect(bit.isMatch(6, 0)).toBe(false);
      expect(bit.isMatch(6, 1)).toBe(false);
      expect(bit.isMatch(6, 2)).toBe(true);
      expect(bit.isMatch(6, 4)).toBe(true);
      expect(bit.isMatch(6, 8)).toBe(false);
      expect(bit.isMatch(7, 0)).toBe(false);
      expect(bit.isMatch(7, 1)).toBe(true);
      expect(bit.isMatch(7, 2)).toBe(true);
      expect(bit.isMatch(7, 4)).toBe(true);
      expect(bit.isMatch(7, 8)).toBe(false);
      expect(bit.isMatch(8, 0)).toBe(false);
      expect(bit.isMatch(8, 1)).toBe(false);
      expect(bit.isMatch(8, 2)).toBe(false);
      expect(bit.isMatch(8, 4)).toBe(false);
      expect(bit.isMatch(8, 8)).toBe(true);
      expect(bit.isMatch(9, 0)).toBe(false);
      expect(bit.isMatch(9, 1)).toBe(true);
      expect(bit.isMatch(9, 2)).toBe(false);
      expect(bit.isMatch(9, 4)).toBe(false);
      expect(bit.isMatch(9, 8)).toBe(true);
      expect(bit.isMatch(10, 0)).toBe(false);
      expect(bit.isMatch(10, 1)).toBe(false);
      expect(bit.isMatch(10, 2)).toBe(true);
      expect(bit.isMatch(10, 4)).toBe(false);
      expect(bit.isMatch(10, 8)).toBe(true);
      expect(bit.isMatch(11, 0)).toBe(false);
      expect(bit.isMatch(11, 1)).toBe(true);
      expect(bit.isMatch(11, 2)).toBe(true);
      expect(bit.isMatch(11, 4)).toBe(false);
      expect(bit.isMatch(11, 8)).toBe(true);
      expect(bit.isMatch(12, 0)).toBe(false);
      expect(bit.isMatch(12, 1)).toBe(false);
      expect(bit.isMatch(12, 2)).toBe(false);
      expect(bit.isMatch(12, 4)).toBe(true);
      expect(bit.isMatch(12, 8)).toBe(true);
      expect(bit.isMatch(13, 0)).toBe(false);
      expect(bit.isMatch(13, 1)).toBe(true);
      expect(bit.isMatch(13, 2)).toBe(false);
      expect(bit.isMatch(13, 4)).toBe(true);
      expect(bit.isMatch(13, 8)).toBe(true);
      expect(bit.isMatch(14, 0)).toBe(false);
      expect(bit.isMatch(14, 1)).toBe(false);
      expect(bit.isMatch(14, 2)).toBe(true);
      expect(bit.isMatch(14, 4)).toBe(true);
      expect(bit.isMatch(14, 8)).toBe(true);
      expect(bit.isMatch(15, 0)).toBe(false);
      expect(bit.isMatch(15, 1)).toBe(true);
      expect(bit.isMatch(15, 2)).toBe(true);
      expect(bit.isMatch(15, 4)).toBe(true);
      expect(bit.isMatch(15, 8)).toBe(true);
      expect(bit.isMatch(16, 0)).toBe(false);
      expect(bit.isMatch(16, 1)).toBe(false);
      expect(bit.isMatch(16, 2)).toBe(false);
      expect(bit.isMatch(16, 4)).toBe(false);
      expect(bit.isMatch(16, 8)).toBe(false);
    });
  });
  describe('getMatchedOrders()', () => {
    test('check valid patterns', () => {
      expect(bit.getMatchedOrders(0)).toEqual([]);
      expect(bit.getMatchedOrders(1)).toEqual([0]);
      expect(bit.getMatchedOrders(2)).toEqual([1]);
      expect(bit.getMatchedOrders(3)).toEqual([0, 1]);
      expect(bit.getMatchedOrders(4)).toEqual([2]);
      expect(bit.getMatchedOrders(5)).toEqual([0, 2]);
      expect(bit.getMatchedOrders(6)).toEqual([1, 2]);
      expect(bit.getMatchedOrders(7)).toEqual([0, 1, 2]);
      expect(bit.getMatchedOrders(8)).toEqual([3]);
    });
  });
  describe('getLowByte()', () => {
    test('check valid patterns', () => {
      expect(bit.getLowByte(0)).toBe(0);
      expect(bit.getLowByte(1)).toBe(1);
      expect(bit.getLowByte(255)).toBe(255);
      expect(bit.getLowByte(256)).toBe(0);
      expect(bit.getLowByte(257)).toBe(1);
    });
  });
  describe('getNecessaryBits()', () => {
    test('check valid patterns', () => {
      expect(bit.getNecessaryBits(0)).toBe(0);
      expect(bit.getNecessaryBits(1)).toBe(1);
      expect(bit.getNecessaryBits(2)).toBe(2);
      expect(bit.getNecessaryBits(3)).toBe(2);
      expect(bit.getNecessaryBits(4)).toBe(3);
      expect(bit.getNecessaryBits(5)).toBe(3);
      expect(bit.getNecessaryBits(6)).toBe(3);
      expect(bit.getNecessaryBits(7)).toBe(3);
      expect(bit.getNecessaryBits(8)).toBe(4);
      expect(bit.getNecessaryBits(5000)).toBe(13);
      expect(bit.getNecessaryBits(0xffffffff)).toBe(32);
    });
  });
  describe('getNecessaryBytes()', () => {
    test('check valid patterns', () => {
      expect(bit.getNecessaryBytes(0)).toBe(0);
      expect(bit.getNecessaryBytes(1)).toBe(1);
      expect(bit.getNecessaryBytes(255)).toBe(1);
      expect(bit.getNecessaryBytes(256)).toBe(2);
      expect(bit.getNecessaryBytes(257)).toBe(2);
      expect(bit.getNecessaryBytes(65535)).toBe(2);
      expect(bit.getNecessaryBytes(65536)).toBe(3);
      expect(bit.getNecessaryBytes(0xffffffff)).toBe(4);
    });
  });
  describe('getBytes()', () => {
    test('check valid patterns', () => {
      expect(bit.getBytes(0)).toEqual([0]);
      expect(bit.getBytes(1)).toEqual([1]);
      expect(bit.getBytes(0xff)).toEqual([0xff]);
      expect(bit.getBytes(0x100)).toEqual([0x1, 0x00]);
      expect(bit.getBytes(0x1ff)).toEqual([0x1, 0xff]);
    });
  });
});
