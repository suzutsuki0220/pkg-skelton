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

function keyEqualValue(query, key, value) {
    var ret = query.length !== 0 ? '&' : '';
    ret += encodeURIComponent(key) + '=' + encodeURIComponent(value);

    return ret;
}

function getQueryInUrl(url) {
    if (!url) url = getWindowLocationHref();
    const delim_idx = url.indexOf('?');

    return delim_idx >= 0 ? splitSection(url.substring(delim_idx + 1)) : "";
}

function getRawParams(url) {
    var params = new Object();

    const arry = getQueryInUrl(url).split('&');
    for (var i=0; i<arry.length; i++) {
        const delim = arry[i].indexOf('=');

        if (delim > 0) {
            const name  = arry[i].substring(0, delim);  // name

            // data
            const data = arry[i].substring(delim + 1);
            if (typeof params[name] === 'undefined') {
                params[name] = data;
            } else {
                if (Array.isArray(params[name])) {
                    params[name].push(data);
                } else {
                    params[name] = [params[name], data];
                }
            }
        } else if (delim < 0 && arry[i]) {
            const name = arry[i];
            params[name] = "";
        }
    }

    return params;
}

module.exports.getQueryInUrl = getQueryInUrl;
module.exports.getRawParams = getRawParams;

module.exports.makeQueryString = function(params) {
    var query = "";
    const keys = Object.keys(params);
    for (var i=0; i<keys.length; i++) {
        const value = params[keys[i]];
        if (Array.isArray(value)) {
            for (var j=0; j<value.length; j++) {
                query += keyEqualValue(query, keys[i], value[j]);
            }
        } else {
            query += keyEqualValue(query, keys[i], value);
        }
    }

    return query;
};

module.exports.getParams = function(url) {
    var params = getRawParams(url);
    for (var p in params) {
        if (Object.prototype.hasOwnProperty.call(params, p)) {
            if (Array.isArray(params[p])) {
                var decoded = new Array();
                for (var j=0; j<params[p].length; j++) {
                    decoded.push(decodeURIComponent(params[p][j].replace(/\+/g, " ")));
                }
                params[p] = decoded;
            } else {
                params[p] = decodeURIComponent(params[p].replace(/\+/g, " "));
            }
        }
    }

    return params;
};

module.exports.getArrayValue = function(params, key) {
    const value = params[key];

    if (!value) {
        return [];
    }

    return Array.isArray(value) ? value : [value];
};
