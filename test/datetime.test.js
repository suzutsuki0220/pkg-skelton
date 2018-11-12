describe('datetime', () => {
  let datetime;
  beforeEach(() => {
    datetime = require('../src/datetime');
  })

  describe('isValidString()', () => {
    test('isValidString', () => {
      expect(datetime.isValidString('')).toBe(false);
      expect(datetime.isValidString('2018-11-11 12:34:56.123')).toBe(true);
//      expect(datetime.isValidString('2018-11-11 24:60:60.123')).toBe(false);
//      expect(datetime.isValidString('2018-13-11 12:34:56.123')).toBe(false);
//      expect(datetime.isValidString('2018-11-32 12:34:56.123')).toBe(false);
    })
  })

  describe('toUTCString()', () => {
    test('toUTCString', () => {
      expect(datetime.toUTCString(0)).toBe('1970/01/01 00:00:00.000');
      expect(datetime.toUTCString(1000)).toBe('1970/01/01 00:00:01.000');
    })
  })

  describe('toString()', () => {
    const tz_offset_msec = (new Date()).getTimezoneOffset() * 60 * 1000;
    test('toString', () => {
      expect(datetime.toString(tz_offset_msec)).toBe('1970/01/01 00:00:00.000');
    })
  })

  describe('toRFC3339UTC()', () => {
    test('toRFC3339UTC', () => {
      expect(datetime.toRFC3339UTC(0)).toBe('1970-01-01T00:00:00Z');
      expect(datetime.toRFC3339UTC(1000)).toBe('1970-01-01T00:00:01Z');
    })
  })

  describe('getDateFromDatetimeString()', () => {
    test('getDateFromDatetimeString', () => {
      expect(datetime.getDateFromDatetimeString('1970/01/01 00:00:00.000')).toBe(0);
    })
  })
})
