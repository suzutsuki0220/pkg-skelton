/**
 * Blobオブジェクトを使ってdataのダウンロード動作を行う
 *  windowオブジェクトを使うためブラウザ専用
**/
module.exports.saveBlob = function(data, filename) {
    const blob = new Blob([data], {"type": "application/octet-stream"});

    if (window.navigator.msSaveBlob) {  // IE (<a> タグに Blob URL は使えない)
        window.navigator.msSaveBlob(blob, filename);
    } else {
        const url = (window.URL || window.webkitURL);  // 古いchrome向けのおまじない
        const dataUrl = url.createObjectURL(blob);

        var a = document.create.Element('a');
        a.href = dataUrl;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
};

// available encoding
//   utf8(default), ascii, utf16le, ucs2, base64, hex
module.exports.load = function(filename, encoding) {
    const fs = require('fs');

    if (typeof encoding === undefined) {
        return fs.readFileSync(filename, {encoding: 'buffer', flag: 'r'});
    } else {
        return fs.readFileSync(filename, {encoding: encoding, flag: 'r'});
    }
};

module.exports.save = function(filename, data, encoding) {
    const fs = require('fs');

    if (typeof encoding === undefined) {
        return fs.writeFileSync(filename, data, {encoding: 'buffer', flag: 'w'});
    } else {
        return fs.writeFileSync(filename, data, {encoding: encoding, flag: 'w'});
    }
};

module.exports.FileToBase64 = function(filename) {
    const Buffer = require('buffer').Buffer;
    return Buffer.from(this.load(filename)).toString('base64');
};

module.exports.Base64ToFile = function(b64data, filename) {
    const Buffer = require('buffer').Buffer;
    const buf = Buffer.from(b64data, 'base64');

    this.save(filename, buf);
};
