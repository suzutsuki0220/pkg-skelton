const jschardet = require('jschardet');
const iconv = require('iconv-lite');
//const buffer = require('./buffer.js');

function workaround(encoding) {
    switch(encoding) {
    case 'windows-1252':
        return 'Shift-JIS';
    default:
        return encoding || 'ascii';
    }
}

module.exports.convert = function(data, from, to) {
    if (!data) {
        return '';
    }

    //const array = buffer.arrayBufferToArray(data);
    //const dec = iconv.decode(buffer.stringToArray(array), from);
    const dec = iconv.decode(Buffer.from(data), from);
    return iconv.encode(dec, to).toString();
};

// 文字コードを推測する
module.exports.detect = function(data) {
    const det = jschardet.detect(Buffer.from(data)).encoding;
    return workaround(det);
};

module.exports.toUTF8 = function(data, from = "") {
    const encoding = from || this.detect(data);
    return this.convert(data, encoding, 'utf-8');
}
