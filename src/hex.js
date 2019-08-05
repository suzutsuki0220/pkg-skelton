const value = require('./value.js');

const HEX_RE = /^[0-9A-Fa-f]+$/;

module.exports.isHex = function(v) {
    return v ? HEX_RE.test(v) : false;
};

module.exports.toHex = function(decimal, digits = 2) {
    return isNaN(decimal) ? null : value.zeroPadding(decimal.toString(16), digits)
};

module.exports.toDecimal = function(hex) {
    return this.isHex(hex) ? parseInt(hex, 16) : NaN;
};
