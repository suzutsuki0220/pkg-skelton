describe('image', () => {
  let image;

  const gray_pad = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAAwCAIAAAAuKetIAAAAQklEQVRo3u3PAQkAAAgDMLV/mie0hSBsDdZJ6rOp5wQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBATuLGnyAnZizub2AAAAAElFTkSuQmCC";

  beforeEach(() => {
    image = require('../config').require.jsUtils.image;
  });

  describe('isValidSize()', () => {
    test('isValidSize', () => {
      expect(image.isValidSize({width: 640, height: 480})).toBe(true);
      expect(image.isValidSize({width: 0, height: 480})).toBe(false);
      expect(image.isValidSize({width: 640, height: 0})).toBe(false);
      expect(image.isValidSize({width: null, height: 0})).toBe(false);
      expect(image.isValidSize({width: 640, height: null})).toBe(false);
      expect(image.isValidSize()).toBe(false);
    });
  });

  describe('isLandscape()', () => {
    test('isLandscape', () => {
      expect(image.isLandscape({width: 480, height: 480})).toBe(true);
      expect(image.isLandscape({width: 640, height: 480})).toBe(true);
      expect(image.isLandscape({width: 480, height: 640})).toBe(false);
    });
  });

  describe('isPortrait()', () => {
    test('isPortrait', () => {
      expect(image.isPortrait({width: 480, height: 480})).toBe(true);
      expect(image.isPortrait({width: 640, height: 480})).toBe(false);
      expect(image.isPortrait({width: 480, height: 640})).toBe(true);
    });
  });

  describe('getAreaSize()', () => {
    test('getAreaSize', () => {
      expect(image.getAreaSize({width: 640, height: 480})).toBe(307200);
      expect(image.getAreaSize({width: 1, height: 1})).toBe(1);
      expect(image.getAreaSize({width: 1, height: 0})).toBe(0);
      expect(image.getAreaSize({width: 0, height: 1})).toBe(0);
      expect(image.getAreaSize({width: 0, height: 0})).toBe(0);
      expect(image.getAreaSize()).toBe(0);
    });
  });

  describe('getAspect()', () => {
    test('getAspect', () => {
      expect(image.getAspect({width: 0, height: 0})).toBe(null);
      expect(image.getAspect({width: 1, height: 1})).toEqual({x: 1, y: 1});
      expect(image.getAspect({width: 320, height: 240})).toEqual({x: 4, y: 3});
      expect(image.getAspect({width: 640, height: 480})).toEqual({x: 4, y: 3});
      expect(image.getAspect({width: 480, height: 480})).toEqual({x: 1, y: 1});
      expect(image.getAspect({width: 1280, height: 720})).toEqual({x: 16, y: 9});
      expect(image.getAspect({width: NaN, height: NaN})).toBe(null);
    });
  });

  describe('getMaximumFitSize()', () => {
    test('getMaximumFitSize', () => {
      expect(image.getMaximumFitSize({width: 1, height: 1}, {width: 640, height: 480})).toEqual({width: 480, height: 480});
      expect(image.getMaximumFitSize({width: 1, height: 1}, {width: 480, height: 640})).toEqual({width: 480, height: 480});
      expect(image.getMaximumFitSize({width: 640, height: 480}, {width: 640, height: 480})).toEqual({width: 640, height: 480});
      expect(image.getMaximumFitSize({width: 480, height: 640}, {width: 640, height: 480})).toEqual({width: 360, height: 480});
      expect(image.getMaximumFitSize({width: 640, height: 480}, {width: 480, height: 640})).toEqual({width: 480, height: 360});
      expect(image.getMaximumFitSize({width: 480, height: 640}, {width: 480, height: 640})).toEqual({width: 480, height: 640});
      expect(image.getMaximumFitSize({width: 1280, height: 720}, {width: 640, height: 480})).toEqual({width: 640, height: 360});
      expect(image.getMaximumFitSize({width: 1280, height: 960}, {width: 640, height: 480})).toEqual({width: 640, height: 480});
    });
  });

  describe('getScale()', () => {
    test('getScale', () => {
      expect(image.getScale({width: 640, height: 480}, 1280)).toBe(2);
      expect(image.getScale({width: 640, height: 480}, 320)).toBe(0.5);
      expect(image.getScale({width: 1, height: 1}, 320)).toBe(320);
      expect(image.getScale({width: 1, height: 320}, 320)).toBe(1);
      expect(image.getScale({width: 320, height: 1}, 320)).toBe(1);
    });
    test('getScale illegal', () => {
      expect(image.getScale({width: 640, height: 480}, 0)).toBe(0);
      expect(image.getScale({width: 0, height: 640}, 1280)).toBe(0);
      expect(image.getScale({width: 640, height: 0}, 1280)).toBe(0);
      expect(image.getScale({width: 0, height: 0}, 1280)).toBe(0);
      expect(image.getScale({width: null, height: null}, 1280)).toBe(0);
      expect(image.getScale({width: 640, height: 480}, null)).toBe(0);
      expect(image.getScale({width: null, height: null}, null)).toBe(0);
    });
  });

  describe('getScaledSize()', () => {
    test('getScaledSize', () => {
      expect(image.getScaledSize({width: 640, height: 480}, 2)).toEqual({width: 1280, height: 960});
      expect(image.getScaledSize({width: 640, height: 480}, 0.5)).toEqual({width: 320, height: 240});
    });
  });

  describe('resize()', () => {
    test('resize after getSize', done => {
      function afterResize(base64) {
        image.getSize(base64, function(size) {
          expect(size).toEqual({width: 640, height: 480});
          done();
        });
      }

      image.resize(gray_pad, 640, afterResize);
    });
  });
});
