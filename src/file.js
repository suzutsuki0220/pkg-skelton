const character = require('./character.js');

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

        this.DownloadWithDummyAnchor(dataUrl, filename);
    }
};

module.exports.DownloadWithDummyAnchor = function(url, filename) {
    var a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
};

module.exports.dataScheme = function(mime, encoding) {
    // mime: image/png, text/plain ...
    // encoding: base64, charset=utf8 ...
    return 'data:' + mime + ';' + encoding + ',';
};

module.exports.hasDataScheme = function(src_data) {
    return src_data.startsWith('data:');
};

module.exports.addDataScheme = function(src_data, mime, encoding) {
    return this.hasDataScheme(src_data) === false ? this.dataScheme(mime, encoding) + src_data : src_data;
};

module.exports.removeDataScheme = function(src_data) {
    if (this.hasDataScheme(src_data) === true) {
        const comma_pos = src_data.indexOf(',');
        return src_data.slice(comma_pos + 1);
    }

    return src_data;
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

module.exports.isFileName = function(filename) {
    if (!filename || filename.length > 247) {
        return false;
    }
    if (character.hasControlChar(filename) || filename.match(/[\\\/:\?<>|\"\*]/)) {
        return false;
    }

    return true;
};

module.exports.FileToBase64 = function(filename) {
    const Buffer = require('buffer').Buffer;
    return Buffer.from(this.load(filename)).toString('base64');
};

module.exports.Base64ToFile = function(b64data, filename) {
    const Buffer = require('buffer').Buffer;
    const buf = Buffer.from(this.removeDataScheme(b64data), 'base64');

    this.save(filename, buf);
};
