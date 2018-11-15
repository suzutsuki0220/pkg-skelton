function noWork() {
    return;
}

var httpRequest = null;
var loading_func = noWork;
var onError_func = noWork;
var success_func = noWork;

function createXhr() {
    const w = (typeof window === 'undefined') ? require('xmlhttprequest') : window;  // nodejs or browser
    return httpRequest = new w.XMLHttpRequest();
}

function stateChangedWork() {
    if (httpRequest.readyState === httpRequest.DONE) {
        if (httpRequest.status === 200) {
            success_func(httpRequest);
        } else {
            onError_func(httpRequest);
        }
    } else {
        loading_func();
    }
}

exports.init = function() {
    this.close();

    httpRequest = createXhr();
    httpRequest.onreadystatechange = stateChangedWork;

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

exports.setRequestHeader = function(header, value) {
    httpRequest.setRequestHeader(header, value);
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
