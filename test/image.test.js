describe('image', () => {
  let image;

  const gray_pad = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAAwCAIAAAAuKetIAAAAQklEQVRo3u3PAQkAAAgDMLV/mie0hSBsDdZJ6rOp5wQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBATuLGnyAnZizub2AAAAAElFTkSuQmCC";

  beforeEach(() => {
    image = require('../config').require.jsUtils.image;
  });

  describe('getScale()', () => {
    test('getScale', () => {
      expect(image.getScale({width: 640, height: 480}, 1280)).toBe(2);
      expect(image.getScale({width: 640, height: 480}, 320)).toBe(0.5);
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
