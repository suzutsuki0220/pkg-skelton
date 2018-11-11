describe('datetime', () => {
  let datetime
  beforeEach(() => {
    datetime = require('../src/datetime');
  })

  describe('isValidString()', () => {
    test('isValidString', () => {
      expect(datetime.isValidString('')).toBe(false)
      expect(datetime.isValidString('2018-11-11 12:34:56.123')).toBe(true)
//      expect(datetime.isValidString('2018-11-11 24:60:60.123')).toBe(false)
//      expect(datetime.isValidString('2018-13-11 12:34:56.123')).toBe(false)
//      expect(datetime.isValidString('2018-11-32 12:34:56.123')).toBe(false)
    })
  })
})
