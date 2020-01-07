const re_full_alphanumeric_and_symbol = /[！-～]/g;  // included /[Ａ-Ｚａ-ｚ０-９／]/
const re_half_alphanumeric_and_symbol = /[!-~]/g;
const re_half_katakana = /[｡-ﾟ]/g;  // 半角カナと点や丸などの幾つかの記号
const re_dakuon_katakana = /[カキクケコサシスセソタチツテトハヒフヘホ]゛/g;
const re_handakuon_katakana = /[ハヒフヘホ]゜/g;

function chr(code) {
    return String.fromCodePoint(code);
}

function doReReplace(re, codeLift, string) {
    return string.replace(re, function(s) {
        return String.fromCharCode(s.charCodeAt(0) + codeLift);
    });
}

function isControlChar(code) {
    return ((0 <= code && code <=31) || code === 127 || (128 <= code && code <= 159));
}

function hasControlChar(string) {
    for (let i=0; i<string.length; i++) {
        if (isControlChar(string.charCodeAt(i))) {
            return true;
        }
    }

    return false;
}

function escapeControlChar(code) {
    if (isControlChar(code)) {
        return '.';
    }

    return chr(code);
}

function combineDakuonnHandakuon(str) {
    str = str.replace(re_dakuon_katakana, function(s) {
        return String.fromCodePoint(s.charCodeAt(0) + 1);
    });

    return str.replace(re_handakuon_katakana, function(s) {
        return String.fromCodePoint(s.charCodeAt(0) + 2);
    });
}

module.exports.isControlChar = isControlChar;
module.exports.hasControlChar = hasControlChar;
module.exports.escapeControlChar = escapeControlChar;
module.exports.chr = chr;

module.exports.normalizeHyphen = function(string) {
    return string.replace(/[－—–−‒─―ｰ━‐]/g, '-');
}

module.exports.repeatChar = function(character, count) {
    let ret = '';

    for (let i=0; i<count; i++) {
        ret += character;
    }

    return ret;
};

module.exports.toHalfWidthLetter = function(string) {
    return doReReplace(re_full_alphanumeric_and_symbol, -0xFEE0, string)
           .replace(/　/g, ' ');
};

module.exports.toFullWidthLetter = function(string) {
    return doReReplace(re_half_alphanumeric_and_symbol, 0xFEE0, string)
           .replace(/ /g, '　');
};

module.exports.toFullWidthKatakana = function(string) {
    const kanaStartCode = 0xFF61;
    const kanamap = [
        '。','「','」','、','・','ヲ','ァ','ィ','ゥ','ェ','ォ','ャ','ュ','ョ','ッ','ー', // ｡｢｣､･ｦｧｨｩｪｫｬｭｮｯｰ
        'ア','イ','ウ','エ','オ','カ','キ','ク','ケ','コ','サ','シ','ス','セ','ソ', // ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿ
        'タ','チ','ツ','テ','ト','ナ','ニ','ヌ','ネ','ノ','ハ','ヒ','フ','ヘ','ホ', // ﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎ
        'マ','ミ','ム','メ','モ','ヤ','ユ','ヨ',      // ﾏﾐﾑﾒﾓﾔﾕﾖ
        'ラ','リ','ル','レ','ロ','ワ','ン','゛','゜'  // ﾗﾘﾙﾚﾛﾜﾝﾞﾟ
    ];

    const fullWidthKana = string.replace(re_half_katakana, function(s) {
        return kanamap[s.charCodeAt(0) - kanaStartCode];
    });

    return combineDakuonnHandakuon(fullWidthKana);
};
