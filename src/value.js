exports.replaceNanToZero = function(value) {
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
exports.normalize = function(input, min, max) {
    if (isNaN(input) === true) {
        return 0;
    } else {
        if (input > max) {
            return max;
        }
        if (input < min) {
            return min;
        }
        return input;
    }
};

exports.setMinMax = function(value, obj) {
    obj.min = isNaN(obj.min) ? value : (obj.min > value ? value : obj.min);
    obj.max = isNaN(obj.max) ? value : (obj.max < value ? value : obj.max);
};

exports.uuid = function() {
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
