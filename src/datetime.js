const value = require('./value');

const datetime_pattern = /(\d{4})[-\/](\d\d)[-\/](\d\d) (\d\d):(\d\d):([\d\.]+)/;

function getDateStr(d, delim) {
    const year  = value.zeroPadding(d.getUTCFullYear(), 4);
    const month = value.zeroPadding(d.getUTCMonth() + 1, 2);
    const date  = value.zeroPadding(d.getUTCDate(), 2);

    return year + delim + month + delim + date;
}

function getTimeStr(d, add_msec) {
    const hour  = value.zeroPadding(d.getUTCHours(), 2);
    const min   = value.zeroPadding(d.getUTCMinutes(), 2);
    const sec   = value.zeroPadding(d.getUTCSeconds(), 2);
    const msec  = add_msec ? "." + value.zeroPadding(d.getUTCMilliseconds(), 3) : "";

    return hour + ":" + min + ":" + sec + msec;
}

module.exports.isValidString = function(datetime_str) {
    return datetime_pattern.test(datetime_str);
};

module.exports.toUTCString = function(epoc) {
    const d = new Date(epoc);

    return getDateStr(d, "/") + " " + getTimeStr(d, true);
};

module.exports.toString = function(epoc) {
    const tz_offset_msec = (new Date()).getTimezoneOffset() * 60 * 1000;

    return this.toUTCString(epoc - tz_offset_msec);
};

module.exports.toRFC3339UTC = function(epoc) {
    const d = new Date(epoc);

    return getDateStr(d, "-") + "T" + getTimeStr(d, false) + "Z";
};

module.exports.getDateFromDatetimeString = function(datetime_str) {
    var d;

    if (!datetime_str) {
        return NaN;
    }

    var dt_match = datetime_str.match(datetime_pattern);
    if (dt_match === null) {
        return NaN;
    }

    const sec = Math.floor(dt_match[6]);
    const milisec = Math.floor((dt_match[6] * 1000) - (sec * 1000));

    d = new Date(Date.UTC(dt_match[1], dt_match[2] - 1, dt_match[3], dt_match[4], dt_match[5], sec, milisec));

    return d.getTime();  // ミリ秒
};

module.exports.roundMilliEpoc = function(milli_epoc) {
    return Math.floor(milli_epoc / 1000) * 1000;
};

module.exports.isMatchInSeconds = function(epoc1, epoc2) {
    var dt1 = Math.floor(epoc1 / 1000) * 1000;
    var dt2 = Math.floor(epoc2 / 1000) * 1000;

    return dt1 === dt2 ? true : false;
};
