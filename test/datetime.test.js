describe('datetime', () => {
  let datetime;
  let patterns;
  beforeEach(() => {
    patterns = require('./testdata/datetime.patterns.js');
    datetime = require('../config').require.jsUtils.datetime;
  })

  describe('getFormatTime()', () => {
    test('getFormatTime', () => {
      expect(datetime.getFormatTime(0, 0, 0)).toBe("00:00:00");
      expect(datetime.getFormatTime(0, 0, 1)).toBe("00:00:01");
      expect(datetime.getFormatTime(0, 1, 0)).toBe("00:01:00");
      expect(datetime.getFormatTime(1, 0, 0)).toBe("01:00:00");
      expect(datetime.getFormatTime(0, 0, 0, 0)).toBe("00:00:00.000");
      expect(datetime.getFormatTime(0, 0, 0, 1)).toBe("00:00:00.001");
      expect(datetime.getFormatTime(0, 0, 1, 0)).toBe("00:00:01.000");
      expect(datetime.getFormatTime(0, 1, 0, 0)).toBe("00:01:00.000");
      expect(datetime.getFormatTime(1, 0, 0, 0)).toBe("01:00:00.000");
    })
  })

  describe('isValidString()', () => {
    test('valid case', () => {
      const valid_patterns = patterns.valid_datetime;
      for (var i=0; i<valid_patterns.length; i++) {
        expect(datetime.isValidString(valid_patterns[i])).toBe(true);
      }
    })
    test('invalid case', () => {
      const invalid_patterns = patterns.invalid_datetime;
      for (var i=0; i<invalid_patterns.length; i++) {
        expect(datetime.isValidString(invalid_patterns[i])).toBe(false);
      }
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

  describe('toPruneString()', () => {
    const tz_offset_msec = (new Date()).getTimezoneOffset() * 60 * 1000;
    test('toPruneString', () => {
      expect(datetime.toPruneString(tz_offset_msec)).toBe('19700101-000000');
      expect(datetime.toPruneString(tz_offset_msec, "_")).toBe('19700101_000000');
      expect(datetime.toPruneString(tz_offset_msec, "")).toBe('19700101000000');
    })
  })

  describe('toRFC3339UTC()', () => {
    test('toRFC3339UTC', () => {
      expect(datetime.toRFC3339UTC()).toBe('1970-01-01T00:00:00Z');
      expect(datetime.toRFC3339UTC(NaN)).toBe('1970-01-01T00:00:00Z');
      expect(datetime.toRFC3339UTC(0)).toBe('1970-01-01T00:00:00Z');
      expect(datetime.toRFC3339UTC(1000)).toBe('1970-01-01T00:00:01Z');
      expect(datetime.toRFC3339UTC(1541980182000)).toBe('2018-11-11T23:49:42Z');
    })
  })

  describe('getDateFromDatetimeString()', () => {
    test('check with invalid datetime', () => {
      const invalid_patterns = patterns.invalid_datetime;
      for (var i=0; i<invalid_patterns.length; i++) {
        expect(datetime.getDateFromDatetimeString(invalid_patterns[i])).toBe(NaN);
      }
    })
    test('check with valid datetime', () => {
      expect(datetime.getDateFromDatetimeString('1970/01/01 00:00:00')).toBe(0);
      expect(datetime.getDateFromDatetimeString('1970/01/01 00:00:00.000')).toBe(0);
      expect(datetime.getDateFromDatetimeString('1970/1/01 00:00:00.000')).toBe(0);
      expect(datetime.getDateFromDatetimeString('1970/01/1 00:00:00.000')).toBe(0);
      expect(datetime.getDateFromDatetimeString('1970/01/01 0:0:0.000')).toBe(0);
      expect(datetime.getDateFromDatetimeString('1970-1-1T00:00:01Z')).toBe(1000);
      expect(datetime.getDateFromDatetimeString('2018-11-11T23:49:42.000Z ')).toBe(1541980182000);
//      expect(datetime.getDateFromDatetimeString('2019-02-25_225849')).toBe(1551135529000);  // not implement
      expect(datetime.getDateFromDatetimeString('/20190607-091240_aaa/xxx.txt')).toBe(1559898760000);
      expect(datetime.getDateFromDatetimeString('P_20190507_120733_vHDR_Auto.jpg')).toBe(1557230853000);
      expect(datetime.getDateFromDatetimeString('1970/1/1 0:0:1')).toBe(1000);
      expect(datetime.getDateFromDatetimeString('1970/1/1 0:1:0')).toBe(60000);
      expect(datetime.getDateFromDatetimeString('1970/1/1 1:0:0')).toBe(3600000);
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

  describe('getEpoch()', () => {
    test('getEpoch', () => {
      expect(datetime.getEpoch(1234)).toBe(1234);
      expect(datetime.getEpoch(1234567890123)).toBe(1234567890.123);
      expect(datetime.getEpoch(NaN)).toBe(NaN);
      expect(datetime.getEpoch('1970/01/01 00:00:01')).toBe(1);
      expect(datetime.getEpoch('1970/01/01 00:00:01.234')).toBe(1.234);
    });
  });
})
