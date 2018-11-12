const datetime_pattern = /(\d{4})[-\/](\d\d)[-\/](\d\d) (\d\d):(\d\d):([\d\.]+)/;

function formatNumber(num, zeros) {
    var ret = "";

    for (var i=0; i<zeros; i++) {
        ret += "0";
    }
    ret += String(num);

    return ret.substr(zeros * -1);
}

function getDatetimeFromEpoc(epoc) {
    var ret = new Object();
    const d = new Date(epoc);

    ret.year  = formatNumber(d.getUTCFullYear(), 4);
    ret.month = formatNumber(d.getUTCMonth() + 1, 2);
    ret.date  = formatNumber(d.getUTCDate(), 2);
    ret.hour  = formatNumber(d.getUTCHours(), 2);
    ret.min   = formatNumber(d.getUTCMinutes(), 2);
    ret.sec   = formatNumber(d.getUTCSeconds(), 2);
    ret.msec  = formatNumber(d.getUTCMilliseconds(), 3);

    return ret;
}

exports.isValidString = function(datetime_str) {
    return datetime_pattern.test(datetime_str);
};

exports.toUTCString = function(epoc) {
    const d = getDatetimeFromEpoc(epoc);

    return d.year + "/" + d.month + "/" + d.date + " " + d.hour + ":" + d.min + ":" + d.sec + "." + d.msec;
};

exports.toString = function(epoc) {
    const tz_offset_msec = (new Date()).getTimezoneOffset() * 60 * 1000;

    return this.toUTCString(epoc - tz_offset_msec);
};

exports.toRFC3339UTC = function(epoc) {
    const d = getDatetimeFromEpoc(epoc);

    return d.year + "-" + d.month + "-" + d.date + "T" + d.hour + ":" + d.min + ":" + d.sec + "Z";
};

exports.getDateFromDatetimeString = function(datetime_str) {
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
