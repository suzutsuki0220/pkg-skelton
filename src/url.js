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

    return delim_idx >= 0 ? splitSection(url.substring(delim_idx + 1)) : "";
};

module.exports.getRawParams = function(url) {
    var params = new Object();

    const arry = this.getQueryInUrl(url).split('&');
    for (var i=0; i<arry.length; i++) {
        const delim = arry[i].indexOf('=');

        if (delim > 0) {
            const name  = arry[i].substring(0, delim);  // name
            params[name] = arry[i].substring(delim + 1); // data
        } else if (delim < 0 && arry[i]) {
            const name = arry[i];
            params[name] = "";
        }
    }

    return params;
};

module.exports.makeQueryString = function(params) {
    var query = "";
    const keys = Object.keys(params);
    for (var i=0; i<keys.length; i++) {
        query += query.length !== 0 ? '&' : '';
        query += encodeURIComponent(keys[i]) + '=' + encodeURIComponent(params[keys[i]]);
    }

    return query;
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
