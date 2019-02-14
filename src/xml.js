module.exports.getDom = function(data) {
    if (typeof data === 'string') {
        const dp = (typeof DOMParser === 'undefined') ? require('xmldom').DOMParser : DOMParser;  // nodejs or browser
        const parser = new dp();
        return parser.parseFromString(data, "application/xml");
    }

    return data;
};

// 引数で指定された名前のノードを返す
// getElementsByTagName()とは違い、再帰的な検索は行わない
module.exports.getFirstFoundChildNode = function(xml, name) {
    if (xml == null) {
        return null;
    }

    if (xml.childNodes == null) {
        return null;
    }

    for (var i=0; i<xml.childNodes.length; i++) {
        if (xml.childNodes.item(i).nodeName === name) {
            return xml.childNodes.item(i);
        }
    }

    return null;
};

// 引数で指定されたchildNodesから最初に見つかったnameのデータを取得する
//   <name>...data...</name>  の ...data... を取得
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
};

// element名の子ノード内の tag_names に指定された名前の tag のデータを取得する
module.exports.getDataInElements = function(xml, element_name, tag_names) {
    const elements = this.getFirstFoundChildNode(xml, element_name);
    if (elements === null) {
        return null;
    }

    var data = new Object();
    for (var j=0; j<tag_names.length; j++) {
        const name = tag_names[j];
        data[name] = this.getFirstFoundTagData(elements.childNodes, name)
    }

    return data;
};
