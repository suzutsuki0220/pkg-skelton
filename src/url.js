module.exports.getQueryInUrl = function(url) {
    if (!url && typeof(window) != 'undefined') url = window.location.href;
    const delim_idx = url.indexOf('?');

    return delim_idx >= 0 ? url.substring(delim_idx + 1) : "";
};

module.exports.getParams = function(url) {
    if (!url && typeof(window) != 'undefined') url = window.location.href;
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
