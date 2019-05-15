const re_full_alphanumeric_and_symbol = /[！-～]/g;  // included /[Ａ-Ｚａ-ｚ０-９／]/
const re_half_alphanumeric_and_symbol = /[!-~]/g;
const re_half_katakana = /[｡-ﾟ]/g;  // 半角カナと点や丸などの幾つかの記号

function doReReplace(re, codeLift, string) {
    return string.replace(re, function(s) {
        return String.fromCharCode(s.charCodeAt(0) + codeLift);
    });
}

module.exports.escapeControlChar = function(code) {
    if ((0 <= code && code <=31) || code === 127 || (128 <= code && code <= 159)) {
        return '.';
    }

    return this.chr(code);
};

module.exports.chr = function(code) {
    return String.fromCodePoint(code);
};

module.exports.normalizeHyphen = function(string) {
    return string.replace(/[－—–−‒─―ｰ━‐]/g, '-');
}

module.exports.toHalfWidthLetter = function(string) {
    return doReReplace(re_full_alphanumeric_and_symbol, -0xFEE0, string)
           .replace(/　/g, ' ');
};

module.exports.toFullWidthLetter = function(string) {
    return doReReplace(re_half_alphanumeric_and_symbol, 0xFEE0, string)
           .replace(/ /g, '　');
};

module.exports.toFullWidthKatakana = function(string) {

};
