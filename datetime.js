var dateTime = function() {
    this.datetime_pattern = /(\d{4})[-\/](\d\d)[-\/](\d\d) (\d\d):(\d\d):([\d\.]+)/;
};

exports.default = dateTime;

dateTime.prototype.__formatNumber = function(num, zeros) {
    var ret = "";

    for (var i=0; i<zeros; i++) {
        ret += "0";
    }
    ret += String(num);

    return ret.substr(zeros * -1);
};

dateTime.prototype.isValidString = function(datetime_str) {
    return this.datetime_pattern.test(datetime_str);
};

dateTime.prototype.toUTCString = function(epoc) {
    var d = new Date(epoc);

    const year  = this.__formatNumber(d.getUTCFullYear(), 4);
    const month = this.__formatNumber(d.getUTCMonth() + 1, 2);
    const date  = this.__formatNumber(d.getUTCDate(), 2);
    const hour  = this.__formatNumber(d.getUTCHours(), 2);
    const min   = this.__formatNumber(d.getUTCMinutes(), 2);
    const sec   = this.__formatNumber(d.getUTCSeconds(), 2);
    const msec  = this.__formatNumber(d.getUTCMilliseconds(), 3);

    return year + "/" + month + "/" + date + " " + hour + ":" + min + ":" + sec + "." + msec;
};

dateTime.prototype.toString = function(epoc) {
    var d = new Date(epoc);

    const year  = this.__formatNumber(d.getFullYear(), 4);
    const month = this.__formatNumber(d.getMonth() + 1, 2);
    const date  = this.__formatNumber(d.getDate(), 2);
    const hour  = this.__formatNumber(d.getHours(), 2);
    const min   = this.__formatNumber(d.getMinutes(), 2);
    const sec   = this.__formatNumber(d.getSeconds(), 2);
    const msec  = this.__formatNumber(d.getMilliseconds(), 3);

    return year + "/" + month + "/" + date + " " + hour + ":" + min + ":" + sec + "." + msec;
};

dateTime.prototype.toRFC3339UTC = function(epoc) {
    var d = new Date(epoc);

    const year  = this.__formatNumber(d.getUTCFullYear(), 4);
    const month = this.__formatNumber(d.getUTCMonth() + 1, 2);
    const date  = this.__formatNumber(d.getUTCDate(), 2);
    const hour  = this.__formatNumber(d.getUTCHours(), 2);
    const min   = this.__formatNumber(d.getUTCMinutes(), 2);
    const sec   = this.__formatNumber(d.getUTCSeconds(), 2);

    return year + "-" + month + "-" + date + "T" + hour + ":" + min + ":" + sec + "Z";
};

dateTime.prototype.getDateFromDatetimeString = function(datetime) {
    var d;

    if (!datetime) {
        return NaN;
    }

    var dt_match = datetime.match(this.datetime_pattern);
    if (dt_match === null) {
        return NaN;
    }

    const sec = Math.floor(dt_match[6]);
    const milisec = Math.floor((dt_match[6] * 1000) - (sec * 1000));

    d = new Date(Date.UTC(dt_match[1], dt_match[2] - 1, dt_match[3], dt_match[4], dt_match[5], sec, milisec));

    return d.getTime();  // ミリ秒
};
