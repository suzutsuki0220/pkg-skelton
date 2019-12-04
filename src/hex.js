const value = require('./value.js');

const HEX_RE = /^[0-9A-Fa-f]+$/;

function isHex(v) {
    return v ? HEX_RE.test(v) : false;
}

module.exports.isHex = isHex;

module.exports.toHex = function(decimal, digits = 2) {
    const d = parseInt(decimal);
    return isNaN(d) ? null : value.zeroPadding(d.toString(16), digits)
};

module.exports.toDecimal = function(hex) {
    return isHex(hex) ? parseInt(hex, 16) : NaN;
};
