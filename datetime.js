const datetime_pattern = /(\d{4})[-\/](\d\d)[-\/](\d\d) (\d\d):(\d\d):([\d\.]+)/;

function formatNumber(num, zeros) {
    var ret = "";

    for (var i=0; i<zeros; i++) {
        ret += "0";
    }
    ret += String(num);

    return ret.substr(zeros * -1);
};

exports.isValidString = function(datetime_str) {
    return datetime_pattern.test(datetime_str);
};

exports.toUTCString = function(epoc) {
    var d = new Date(epoc);

    const year  = formatNumber(d.getUTCFullYear(), 4);
    const month = formatNumber(d.getUTCMonth() + 1, 2);
    const date  = formatNumber(d.getUTCDate(), 2);
    const hour  = formatNumber(d.getUTCHours(), 2);
    const min   = formatNumber(d.getUTCMinutes(), 2);
    const sec   = formatNumber(d.getUTCSeconds(), 2);
    const msec  = formatNumber(d.getUTCMilliseconds(), 3);

    return year + "/" + month + "/" + date + " " + hour + ":" + min + ":" + sec + "." + msec;
};

exports.toString = function(epoc) {
    var d = new Date(epoc);

    const year  = formatNumber(d.getFullYear(), 4);
    const month = formatNumber(d.getMonth() + 1, 2);
    const date  = formatNumber(d.getDate(), 2);
    const hour  = formatNumber(d.getHours(), 2);
    const min   = formatNumber(d.getMinutes(), 2);
    const sec   = formatNumber(d.getSeconds(), 2);
    const msec  = formatNumber(d.getMilliseconds(), 3);

    return year + "/" + month + "/" + date + " " + hour + ":" + min + ":" + sec + "." + msec;
};

exports.toRFC3339UTC = function(epoc) {
    var d = new Date(epoc);

    const year  = formatNumber(d.getUTCFullYear(), 4);
    const month = formatNumber(d.getUTCMonth() + 1, 2);
    const date  = formatNumber(d.getUTCDate(), 2);
    const hour  = formatNumber(d.getUTCHours(), 2);
    const min   = formatNumber(d.getUTCMinutes(), 2);
    const sec   = formatNumber(d.getUTCSeconds(), 2);

    return year + "-" + month + "-" + date + "T" + hour + ":" + min + ":" + sec + "Z";
};

exports.getDateFromDatetimeString = function(datetime) {
    var d;

    if (!datetime) {
        return NaN;
    }

    var dt_match = datetime.match(datetime_pattern);
    if (dt_match === null) {
        return NaN;
    }

    const sec = Math.floor(dt_match[6]);
    const milisec = Math.floor((dt_match[6] * 1000) - (sec * 1000));

    d = new Date(Date.UTC(dt_match[1], dt_match[2] - 1, dt_match[3], dt_match[4], dt_match[5], sec, milisec));

    return d.getTime();  // ミリ秒
};
