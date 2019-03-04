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
