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

// 最下位Byteを取得
module.exports.getLowByte = function(data) {
    const bitMask = 0xff;
    return data & bitMask;
};

module.exports.getNecessaryBits = function(value, maxSize = 32) {
    let bit = 0;

    while (bit <= maxSize) {
        const expressible = (1 << bit) - 1;
        if (expressible >= value) {
            return bit;
        }
        bit++;
    }

    return maxSize;
};

module.exports.getNecessaryBytes = function(value, maxSize = 4) {
    const maxBits = maxSize * 8;
    const needBits = this.getNecessaryBits(value, maxBits);

    return Math.ceil(needBits / 8);
};

// マルチバイトのデータを1バイトずつ取り出して配列に入れて返す
module.exports.getBytes = function(value, bytes = NaN) {
    let array = new Array();
    let i = 0;

    const size = bytes || this.getNecessaryBytes(value);

    do {
        const lsb = value >> i * 8;
        array.unshift(this.getLowByte(lsb));
        i++;
    } while(i < size)

    return array;
};
