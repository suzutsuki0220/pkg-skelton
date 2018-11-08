exports.init = function() {
    var httpRequest;

    if (window.XMLHttpRequest) { // Mozilla, Safari, ...
        httpRequest = new XMLHttpRequest();

        if (httpRequest.overrideMimeType) {
            httpRequest.overrideMimeType('text/xml');
        }
    } else if (window.ActiveXObject) { // IE
        try {
            httpRequest = new ActiveXObject("Msxml2.XMLHTTP");
        } catch(e) {
            try {
                httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
            } catch(e) {
                alert('ERROR: ' + e.description);
            }
        }
    }
    return httpRequest;
}

exports.setInstance = function(httpRequest, func) {
    httpRequest.onreadystatechange = func;
}

exports.get = function(httpRequest, url) {
    httpRequest.open('GET', url, true);
    httpRequest.send(null);
}

exports.post = function(httpRequest, url, query) {
    httpRequest.open('POST', url, true);
    httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    httpRequest.send(query);
}
