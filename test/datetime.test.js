describe('datetime', () => {
  let datetime;
  beforeEach(() => {
    datetime = require('../config').require.jsUtils.datetime;
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
      expect(datetime.toUTCString()).toBe('1970/01/01 00:00:00.000');
      expect(datetime.toUTCString(NaN)).toBe('1970/01/01 00:00:00.000');
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
      expect(datetime.toRFC3339UTC()).toBe('1970-01-01T00:00:00Z');
      expect(datetime.toRFC3339UTC(NaN)).toBe('1970-01-01T00:00:00Z');
      expect(datetime.toRFC3339UTC(0)).toBe('1970-01-01T00:00:00Z');
      expect(datetime.toRFC3339UTC(1000)).toBe('1970-01-01T00:00:01Z');
    })
  })

  describe('getDateFromDatetimeString()', () => {
    test('getDateFromDatetimeString', () => {
      expect(datetime.getDateFromDatetimeString()).toBe(NaN);
      expect(datetime.getDateFromDatetimeString('')).toBe(NaN);
      expect(datetime.getDateFromDatetimeString('1999/01/01')).toBe(NaN);
      expect(datetime.getDateFromDatetimeString('00:00:00.000')).toBe(NaN);
      expect(datetime.getDateFromDatetimeString('99/01/01 00:00:00.000')).toBe(NaN);
      expect(datetime.getDateFromDatetimeString('1999/1/1 00:00:00.000')).toBe(NaN);
      expect(datetime.getDateFromDatetimeString('1999/01/01 0:0:0.000')).toBe(NaN);
      expect(datetime.getDateFromDatetimeString('1970/01/01 00:00:00')).toBe(0);
      expect(datetime.getDateFromDatetimeString('1970/01/01 00:00:00.000')).toBe(0);
    })
  })

  describe('roundMilliEpoc()', () => {
    test('roundMilliEpoc', () => {
      expect(datetime.roundMilliEpoc()).toBe(NaN);
      expect(datetime.roundMilliEpoc(NaN)).toBe(NaN);
      expect(datetime.roundMilliEpoc(0)).toBe(0);
      expect(datetime.roundMilliEpoc(1)).toBe(0);
      expect(datetime.roundMilliEpoc(999)).toBe(0);
      expect(datetime.roundMilliEpoc(1000)).toBe(1000);
      expect(datetime.roundMilliEpoc(1999)).toBe(1000);
      expect(datetime.roundMilliEpoc(2000)).toBe(2000);
    })
  })

  describe('isMatchInSeconds()', () => {
    test('isMatchInSeconds', () => {
      expect(datetime.isMatchInSeconds()).toBe(false);
      expect(datetime.isMatchInSeconds(0)).toBe(false);
      expect(datetime.isMatchInSeconds(10)).toBe(false);
      expect(datetime.isMatchInSeconds(NaN)).toBe(false);
      expect(datetime.isMatchInSeconds(NaN, 0)).toBe(false);
      expect(datetime.isMatchInSeconds(NaN, NaN)).toBe(false);
      expect(datetime.isMatchInSeconds(0, 0)).toBe(true);
      expect(datetime.isMatchInSeconds(1, 0)).toBe(true);
      expect(datetime.isMatchInSeconds(0, 1)).toBe(true);
      expect(datetime.isMatchInSeconds(1000, 1000)).toBe(true);
      expect(datetime.isMatchInSeconds(1000, 1001)).toBe(true);
      expect(datetime.isMatchInSeconds(999, 1000)).toBe(false);
      expect(datetime.isMatchInSeconds(0, 1000)).toBe(false);
    })
  })
})
