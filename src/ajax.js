function noWork() {
    return;
}

var httpRequest = null;
var loading_func = noWork;
var onError_func = noWork;
var success_func = noWork;

exports.init = function() {
    this.close();

    const w = (typeof window === 'undefined') ? require('xmlhttprequest') : window;
    httpRequest = new w.XMLHttpRequest();

    httpRequest.onreadystatechange = function() {
        if (httpRequest.readyState === httpRequest.DONE) {
            if (httpRequest.status === 200) {
                success_func(httpRequest);
            } else {
                onError_func(httpRequest);
            }
        } else {
            loading_func();
        }
    };

    if (httpRequest.overrideMimeType) {
        httpRequest.overrideMimeType('text/xml');
    }
};

exports.close = function() {
    if (httpRequest) {
        httpRequest = null;
    }
};

exports.setOnLoading = function(func) {
    loading_func = func;
};

exports.setOnSuccess = function(func) {
    success_func = func;
};

exports.setOnError = function(func) {
    onError_func = func;
};

exports.get = function(url) {
    httpRequest.open('GET', url, true);
    httpRequest.send(null);
};

exports.post = function(url, query) {
    httpRequest.open('POST', url, true);
    httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    httpRequest.send(query);
};
