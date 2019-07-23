const value = require('./value');

const datetime_pattern = /((?:[12]\d{3})|(?:\d{2}))[\-\/\.]([01]?\d)[\-\/\.]([0123]?\d)[ _\-T]([012]?\d):([0-5]?\d):([\d\.]+)((?:Z|(?:\+|\-[012]\d:[0-5]\d))?)/;
const prune_datetime_pattern = /((?:[12]\d{3})|(?:\d{2}))([01]?\d)([0123]?\d)[ _\-]([012]?\d)([0-5]?\d)([0-5]?[\d])/;

function getDateStr(d, delim) {
    const year  = value.zeroPadding(d.getUTCFullYear(), 4);
    const month = value.zeroPadding(d.getUTCMonth() + 1, 2);
    const date  = value.zeroPadding(d.getUTCDate(), 2);

    return year + delim + month + delim + date;
}

function hhmmss(hour, min, sec, delim) {
    const h = value.zeroPadding(Math.floor(hour), 2);
    const m = value.zeroPadding(Math.floor(min), 2);
    const s = value.zeroPadding(Math.floor(sec), 2);

    return h + delim + m + delim + s;
}

function ms(msec) {
    return "." + value.zeroPadding(Math.floor(msec), 3);
}

function getTimeStr(d, delim, add_msec) {
    const hour  = d.getUTCHours();
    const min   = d.getUTCMinutes();
    const sec   = d.getUTCSeconds();

    return add_msec ?
        hhmmss(hour, min, sec, delim) + ms(d.getUTCMilliseconds()) :
        hhmmss(hour, min, sec, delim);
}

function getEpochSecondPrecision(epoc) {
    // 32Bit整数より大きければミリ秒精度とみなして桁を落とす
    return (epoc > 4294967295) ? (epoc / 1000) : epoc;
}

module.exports.getFormatTime = function(hour, min, sec, milisec) {
    const msec = isNaN(milisec) === false ? ms(milisec) : "";

    return hhmmss(hour, min, sec, ":") + msec;
};

module.exports.isValidString = function(datetime_str) {
    return datetime_pattern.test(datetime_str);
};

module.exports.toUTCString = function(epoc) {
    const d = new Date(value.replaceNanToZero(epoc));

    return getDateStr(d, "/") + " " + getTimeStr(d, ":", true);
};

module.exports.toString = function(epoc) {
    const tz_offset_msec = (new Date()).getTimezoneOffset() * 60 * 1000;

    return this.toUTCString(epoc - tz_offset_msec);
};

module.exports.toPruneString = function(epoc, space = "-") {
    const tz_offset_msec = (new Date()).getTimezoneOffset() * 60 * 1000;
    const d = new Date(value.replaceNanToZero(epoc - tz_offset_msec));

    return getDateStr(d, "") + space + getTimeStr(d, "", false);
};

module.exports.toRFC3339UTC = function(epoc) {
    const d = new Date(value.replaceNanToZero(epoc));

    return getDateStr(d, "-") + "T" + getTimeStr(d, ":", false) + "Z";
};

module.exports.getDateFromDatetimeString = function(datetime_str) {
    var d;

    if (!datetime_str) {
        return NaN;
    }

    var dt_match = datetime_str.match(datetime_pattern) || datetime_str.match(prune_datetime_pattern);
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

// Epoch時刻を求める。秒以下は小数で表す。秒単位にするにはMath.floor()で丸めて下さい
module.exports.getEpoch = function(datetime) {
    var ret = NaN;

    if (typeof datetime === "number") {
        ret = getEpochSecondPrecision(datetime);
    } else if (typeof datetime === "string") {
        ret = this.getDateFromDatetimeString(datetime) / 1000;
    }

    return ret;
};
