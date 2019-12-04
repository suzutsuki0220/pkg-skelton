let parameters  = new Object;

parameters.bit = {
    isMatch: ["value", "pattern"],
    getMatchedOrders: ["value"]
}

parameters.character = {
    escapeControlChar: ["code"],
    chr: ["code"],
    normalizeHyphen: ["string"],
    toHalfWidthLetter: ["string"],
    toFullWidthLetter: ["string"],
    toFullWidthKatakana: ["string"]
};

parameters.datetime = {
    getFormatTime: ["hour", "min", "sec", "milisec"],
    isValidString: ["datetimeString"],
    toUTCString: ["epoc", "addMsec"],
    toString: ["epoc", "addMsec"],
    toPruneString: ["epoc", "space"],
    toRFC3339UTC: ["epoc"],
    getDateFromDatetimeString: ["datetimeString"],
    roundMilliEpoc: ["milli_epoc"],
    isMatchInSeconds: ["epoc1", "epoc2"],
    getEpoch: ["datetime"]
};

parameters.file = {
};

parameters.hex = {
    isHex: ["value"],
    toHex: ["decimal", "digits"],
    toDecimal: ["hex"]
};

parameters.range = {
    getStartEnd: ["numbersArray", "step"]
};
