function pushStartEnd(array, start, lastValue) {
    if (start !== lastValue) {
        array.push({start: start, end: lastValue});
    }
}

// values配列の連続した値から 開始値(start) と 終了値(end) を求める
module.exports.getStartEnd = function(numbersArray, step = 1) {
    var ret = new Array();

    if (!Array.isArray(numbersArray) || numbersArray.length < 2) {
        return ret;
    }

    var lastValue = numbersArray[0];
    var invalidStart = numbersArray[0];

    for (var i=1; i<numbersArray.length; i++) {
        const v = numbersArray[i];

        if (v - lastValue > step) {
            pushStartEnd(ret, invalidStart, lastValue);
            invalidStart = v;
        }

        lastValue = v;
    }

    pushStartEnd(ret, invalidStart, lastValue);

    return ret;
};
