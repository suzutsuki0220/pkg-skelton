function getWindowLocationHref() {
    return typeof(window) !== 'undefined' ? window.location.href : "";
}

function splitSection(value) {
    const idx = value.indexOf('#');
    if (idx >= 0) {
        value = value.substring(0, idx);
    }

    return value;
}

module.exports.getQueryInUrl = function(url) {
    if (!url) url = getWindowLocationHref();
    const delim_idx = url.indexOf('?');

    return delim_idx >= 0 ? url.substring(delim_idx + 1) : "";
};

module.exports.getRawParams = function(url) {
    if (!url) url = getWindowLocationHref();
    var params = new Object();

    const arry = this.getQueryInUrl(url).split('&');
    for (var i=0; i<arry.length; i++) {
        const delim = arry[i].indexOf('=');

        if (delim > 0) {
            const name  = arry[i].substring(0, delim);  // name
            params[name] = splitSection(arry[i].substring(delim + 1)); // data
        } else if (delim < 0 && arry[i]) {
            const name = splitSection(arry[i]);
            params[name] = "";
        }
    }

    return params;
};

module.exports.getParams = function(url) {
    var params = this.getRawParams(url);
    for (var p in params) {
        if (params.hasOwnProperty(p)) {
            params[p] = decodeURIComponent(params[p].replace(/\+/g, " "));
        }
    }

    return params;
};
