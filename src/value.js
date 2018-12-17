module.exports.replaceNanToZero = function(value) {
    var ret = 0;
    if (value) {
        ret = parseFloat(value.trim ? value.trim() : value);
        if (isNaN(ret) === true) {
            ret = 0;
        }
    }
    return ret;
};

// value を最小値から最大値の間に収めるように返す
module.exports.normalize = function(input, min, max) {
    if (isNaN(input) === true) {
        return 0;
    }

    return input > max ? max : (input < min ? min : input);
};

module.exports.setMinMax = function(value, obj) {
    obj.min = this.getMin(value, obj.min);
    obj.max = this.getMax(value, obj.max);
};

module.exports.getMin = function(value, min) {
    return isNaN(min) ? value : (min > value ? value : min);
};

module.exports.getMax = function(value, max) {
    return isNaN(max) ? value : (max < value ? value : max);
};

// CSV等の区切り文字を ',' に統一する
module.exports.replaceSeparator = function(string) {
    return string ? string.replace(/[\t ]/g, ',') : "";
};

// 改行コードを `\n` に統一する
module.exports.fixNewLine = function(string) {
    return string ? string.replace(/(\r\n|\r|\n)/g, '\n') : "";
};

module.exports.uuid = function() {
    var uuid = "";
    for (var i=0; i<32; i++) {
        const random = Math.random() * 16 | 0;
        if (i == 8 || i == 12 || i == 16 || i == 20) {
            uuid += "-";
        }
        uuid += (i == 12 ? 4 : (i == 16 ? (random & 3 | 8) : random)).toString(16);
    }
    return uuid;
};
