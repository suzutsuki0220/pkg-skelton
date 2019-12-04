function isMatch(value, pattern) {
    if (!value || !pattern) {
        return false;
    }

    const v = parseInt(value);
    const p = parseInt(pattern);

    return (v & p) === p;
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
