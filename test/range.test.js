describe('range', () => {
  let range;

  beforeEach(() => {
    range = require('../config').require.jsUtils.range;
  });

  describe('getStartEnd()', () => {
    test('return empty array', () => {
      expect(range.getStartEnd()).toEqual([]);
      expect(range.getStartEnd([])).toEqual([]);
      expect(range.getStartEnd([1])).toEqual([]);
      expect(range.getStartEnd([2, 4])).toEqual([]);
    });
    test('getStartEnd', () => {
      expect(range.getStartEnd([1, 2])).toEqual([{start: 1, end: 2}]);
      expect(range.getStartEnd([1, 2, 3])).toEqual([{start: 1, end: 3}]);
      expect(range.getStartEnd([1, 2, 4, 5])).toEqual([{start: 1, end: 2}, {start: 4, end: 5}]);
      expect(range.getStartEnd([1, 2, 4])).toEqual([{start: 1, end: 2}]);
      expect(range.getStartEnd([1, 3, 4])).toEqual([{start: 3, end: 4}]);
      expect(range.getStartEnd([0, 1, 2, 3, 4])).toEqual([{start: 0, end: 4}]);
      expect(range.getStartEnd([0, 1, 2, 5, 6, 7, 8])).toEqual([{start: 0, end: 2}, {start: 5, end: 8}]);
      expect(range.getStartEnd([0, 1, 2, 5, 6, 8, 9])).toEqual([{start: 0, end: 2}, {start: 5, end: 6}, {start: 8, end: 9}]);
    });
  });
});
