function fetchResource() {
    return (typeof fetch === 'undefined') ? require('node-fetch') : fetch;
}

function uriComponent(body) {
    if (! body) {
        return "";
    }

    return "?" + encodeURIComponent(body);
}

function composeBody(request) {
    if (!request.method || request.method === "GET") {
        return {
            uri: request.uri + uriComponent(request.body);
            body: null;
        };
    } else {
        return {
            uri: request.uri;
            body: request.body:
        };
    }
}

modules.exports.request = function(uri, request, onSuccess, onError) {
    const compose = composeBody(request);

    const f = fetchResource();
    f(compose.uri, {
        method: request.method || 'GET',
        credentials: 'same-origin',
        headers: request.headers || [],
        body: compose.body
    }).then(reqponse => {
        if (response.ok) {
            return (request.format === "json") ? response.json() : response.text();
        } else {
            return Promise.reject(new Error("ERROR status: " + response.status));
        }
    }).then(onSuccess).catch(onError);
};
