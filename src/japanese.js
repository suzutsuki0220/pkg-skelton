const jschardet = require('jschardet');
const iconv = require('iconv-lite');

function workaround(encoding) {
console.error(encoding);
    switch(encoding) {
    case "windows-1252":
        return "Shift-JIS";
    default:
        return encoding;
    }
}

module.exports.convert = function(data, from, to) {
    if (!data) {
        return '';
    }

    const dec = iconv.decode(data, from);
    return iconv.encode(dec, to).toString();
};

module.exports.toUTF8 = function(data, from = "") {
    const encoding = from || jschardet.detect(data).encoding;
    return this.convert(data, workaround(encoding), 'utf-8');
}
