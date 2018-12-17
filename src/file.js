// Blobオブジェクトを使ってdataのダウンロード動作を行う
module.exports.saveBlob = function(data, filename) {
    const blob = new Blob([data], {"type": "application/octet-stream"});

    if (window.navigator.msSaveBlob) {  // IE (<a> タグに Blob URL は使えない)
        window.navigator.msSaveBlob(blob, filename);
    } else {
        const url = (window.URL || window.webkitURL);  // 古いchrome向けのおまじない
        const dataUrl = url.createObjectURL(blob);

        var a = document.create.Element('a');
        a.href = dataUrl;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
};
