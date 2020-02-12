function isArrayBuffer(data) {
    return (data instanceof ArrayBuffer) ? true : false;
}

function twodigit(data, i) {
    return parseInt(data.charAt(i) + data.charAt(i + 1), 16);
}

module.exports.getUTF8code = function(string) {
    let encoded = encodeURIComponent(string);

    let array = new Array();
    let i = 0;
    while(i < encoded.length) {
        const c = encoded.charAt(i);
        if (c === '%') {
            array.push(twodigit(encoded, i + 1));
            i += 2;
        } else {
            array.push(c.charCodeAt(0));
        }

        i++;
    }

    return Uint8Array.from(array);
};

module.exports.toBinaryString = function(data) {
    const array8 = (isArrayBuffer(data)) ? Uint8Array.from(data) : Buffer.from(data);
    let binaryString = "";
    for (let i=0; i<array8.length; i++) {
        binaryString += String.fromCharCode(array8[i]);
    }

    return binaryString;
};

module.exports.toArrayBuffer = function(buf) {
    const ab = new ArrayBuffer(buf.length);
    const view = new Uint8Array(ab);
    for (let i=0; i<buf.length; i++) {
        view[i] = buf[i];
    }

    return ab;
};

module.exports.arrayBufferToArray = function(data) {
    if (isArrayBuffer(data)) {
        return new Uint8Array(data);
    }

    return data;
};

module.exports.stringToArray = function(data) {
    if (typeof data === 'string') {
        return this.getUTF8code(data);
    }

    return data;
};

module.exports.isArrayBuffer = isArrayBuffer;
