module.exports.escapeControlChar = function(code) {
    if ((0 <= code && code <=31) || code === 127 || (128 <= code && code <= 159)) {
        return '.';
    }

    return this.chr(code);
};

module.exports.chr = function(code) {
    return String.fromCodePoint(code);
};
