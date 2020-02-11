const jschardet = require('jschardet');
const iconv = require('iconv-lite');

function workaround(encoding) {
    switch(encoding) {
    case 'windows-1252':
        return 'Shift-JIS';
    default:
        return encoding || 'ascii';
    }
}

function bufferToBinaryString(data) {
    if (typeof data === 'string') {
        return data;
    }

    const array8 = new Uint8Array(data);
    let binaryString = "";
    for (let i=0; i<array8.length; i++) {
        binaryString += String.fromCharCode(array8[i]);
    }

    return binaryString;
}

function stringToArray(data) {
    if (typeof data === 'string') {
        let buffer = new Uint8Array(data.length);
        for (let i=0; i<data.length; i++) {
            buffer[i] = data.charCodeAt(i);
        }
        return buffer;
    } else if (isArrayBuffer(data)) {
        return new Uint8Array(data);
    }

    return data;
}

function isArrayBuffer(data) {
    return (data instanceof ArrayBuffer) ? true : false;
}

function needDecode(encode) {
    const e = encode.toLowerCase();
    if (e === 'utf-8' || e === 'ascii') {
        return false;
    }

    return true;
}

module.exports.convert = function(data, from, to) {
    if (!data) {
        return '';
    }

    const dec = needDecode(from) ? iconv.decode(stringToArray(data), from) : data;
    return iconv.encode(dec, to).toString();
};

module.exports.toUTF8 = function(data, from = "") {
    const encoding = from || jschardet.detect(bufferToBinaryString(data)).encoding;
    return this.convert(data, workaround(encoding), 'utf-8');
}
