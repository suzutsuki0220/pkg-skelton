function noWork() {}

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
            uri: request.uri + uriComponent(request.body),
            body: null
        };
    } else {
        return {
            uri: request.uri,
            body: request.body
        };
    }
}

module.exports.request = function(request, onSuccess = noWork, onError = noWork) {
    const compose = composeBody(request);

    const f = fetchResource();
    f(compose.uri, {
        method: request.method || 'GET',
        credentials: 'same-origin',
        headers: request.headers || [],
        body: compose.body
    }).then(response => {
        if (response.ok) {
            // request.format -> arrayBuffer, blob, json, text, formData
            return (request.format) ? response[request.format]() : response.text();
        } else {
            return Promise.reject(new Error(response.status + " " + response.statusText));
        }
    }).then(onSuccess).catch(onError);
};
