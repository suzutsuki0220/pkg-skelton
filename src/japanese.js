const jschardet = require('jschardet');
const iconv = require('iconv-lite');

function workaround(encoding) {
    switch(encoding) {
    case "windows-1252":
        return "Shift-JIS";
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
        let buffer = new Uint16Array(data.length);
        for (let i=0; i<data.length; i++) {
            buffer[i] = data.charCodeAt(i);
        }
        return buffer;
    }

    return data;
}

module.exports.convert = function(data, from, to) {
    if (!data) {
        return '';
    }

    const dec = iconv.decode(data, from);
    return iconv.encode(dec, to).toString();
};

module.exports.toUTF8 = function(data, from = "") {
    const encoding = from || jschardet.detect(bufferToBinaryString(data)).encoding;
    return this.convert(stringToArray(data), workaround(encoding), 'utf-8');
}
