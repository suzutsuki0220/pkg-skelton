module.exports.getDom = function(data) {
    if (typeof data === 'string') {
        const dp = (typeof DOMParser === 'undefined') ? require('dom-parser') : DOMParser;  // nodejs or browser
        const parser = new dp();
        return parser.parseFromString(data, "application/xml");
    }

    return data;
};

// 引数で指定された名前のノードを返す
// getElementsByTagName()とは違い、再帰的な検索は行わない
module.exports.getFirstFoundChildNode = function(element, name) {
    if (element == null) {
        return null;
    }

    if (element.childNodes == null) {
        return null;
    }

    for (var i=0; i<element.childNodes.length; i++) {
        if (element.childNodes.item(i).nodeName === name) {
            return element.childNodes.item(i);
        }
    }

    return null;
};

// 引数で指定されたchildNodesから最初に見つかったnameのデータを取得する
// 再帰的な検索と、同名のタグを検索しないためデータが増えたときに重くなりにくい
module.exports.getFirstFoundTagData = function(elements, name) {
    if (elements == null) {
        return "";
    }

    if (elements.length) {
        for (var i=0; i<elements.length; i++) {
            if (elements.item(i).tagName === name) {
                return elements.item(i).textContent;
            }
        }
    }

    return "";
}
