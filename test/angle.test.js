describe('angle', () => {
  let angle;

  beforeEach(() => {
    angle = require('../config').require.jsUtils.angle;
  });


  describe('check degree to radian', () => {
    test('degToRad', () => {
      expect(angle.degToRad(0)).toBe(0);
      expect(angle.degToRad(90)).toBe(Math.PI / 2);
      expect(angle.degToRad(180)).toBe(Math.PI);
      expect(angle.degToRad(270)).toBe(1.5 * Math.PI);
      expect(angle.degToRad(360)).toBe(2 * Math.PI);
    })
  });

  describe('check radian to degree', () => {
    test('radToDeg', () => {
      expect(angle.radToDeg(0)).toBe(0);
      expect(angle.radToDeg(Math.PI / 2)).toBe(90);
      expect(angle.radToDeg(Math.PI)).toBe(180);
      expect(angle.radToDeg(1.5 * Math.PI)).toBe(270);
      expect(angle.radToDeg(2 * Math.PI)).toBe(360);
    })
  });
});
