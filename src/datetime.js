const value = require('./value');

const datetime_pattern = /(\d{4})[-\/](\d\d)[-\/](\d\d) (\d\d):(\d\d):([\d\.]+)/;

function getDateStr(d, delim) {
    const year  = value.zeroPadding(d.getUTCFullYear(), 4);
    const month = value.zeroPadding(d.getUTCMonth() + 1, 2);
    const date  = value.zeroPadding(d.getUTCDate(), 2);

    return year + delim + month + delim + date;
}

function getTimeStr(d, add_msec) {
    const hour  = d.getUTCHours();
    const min   = d.getUTCMinutes();
    const sec   = d.getUTCSeconds();
    const msec  = add_msec ? d.getUTCMilliseconds() : NaN;

    return this.getFormatTime(hour, min, sec, msec);
}

module.exports.getFormatTime = (hour, min, sec, milisec)
    const h = value.zeroPadding(hour, 2);
    const m = value.zeroPadding(min, 2);
    const s = value.zeroPadding(sec, 2);
    const msec  = isNaN(milisec) === false ? "." + value.zeroPadding(milisec, 3) : "";

    return hour + ":" + min + ":" + sec + msec;
}

module.exports.isValidString = function(datetime_str) {
    return datetime_pattern.test(datetime_str);
};

module.exports.toUTCString = function(epoc) {
    const d = new Date(value.replaceNanToZero(epoc));

    return getDateStr(d, "/") + " " + getTimeStr(d, true);
};

module.exports.toString = function(epoc) {
    const tz_offset_msec = (new Date()).getTimezoneOffset() * 60 * 1000;

    return this.toUTCString(epoc - tz_offset_msec);
};

module.exports.toRFC3339UTC = function(epoc) {
    const d = new Date(value.replaceNanToZero(epoc));

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
    if (isNaN(milli_epoc) === true) {
        return NaN;
    }

    return Math.floor(milli_epoc / 1000) * 1000;
};

module.exports.isMatchInSeconds = function(epoc1, epoc2) {
    const dt1 = this.roundMilliEpoc(epoc1);
    const dt2 = this.roundMilliEpoc(epoc2);

    if (isNaN(dt1) === true || isNaN(dt2) === true) {
        return false;
    }

    return dt1 === dt2 ? true : false;
};
