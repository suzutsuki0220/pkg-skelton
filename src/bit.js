function isMatch(value, pattern) {
    if (!value || !pattern) {
        return false;
    }

    return (value & pattern) === pattern;
}

module.exports.isMatch = isMatch;

module.exports.getMatchedOrders = function(value) {
    var ret = new Array();
    var caseBit = 1;
    while (value >= caseBit) {
        if (isMatch(value, caseBit)) {
            ret.push(Math.log2(caseBit));
        }
        caseBit <<= 1;
    }

    return ret;
};
