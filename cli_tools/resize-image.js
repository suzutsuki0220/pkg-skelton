#!/usr/bin/env node

/* eslint no-console: "off" */

const jsUtils = require('./index.js');

const file = jsUtils.file;
const image = jsUtils.image;

const target_size = {
    android_status_icon: {
        18: "mdpi_ic_status",
        27: "hdpi_ic_status",
        36: "xhdpi_ic_status",
        54: "xxhdpi_ic_status",
        72: "xxxhdpi_ic_status"
    },
    android_app_icon: {
        48: "mdpi_ic_launcher",
        72: "hdpi_ic_launcher",
        96: "xhdpi_ic_launcher",
        144: "xxhdpi_ic_launcher",
        192: "xxxhdpi_ic_launcher"
    },
    mac_iconset: {
        16:   "icon_16x16",
        32:   "icon_32x32",
        128:  "icon_128x128",
        256:  "icon_256x256",
        512:  "icon_512x512"
    },
    mac_retina_iconset: {
        32:   "icon_16x16\@2x",
        64:   "icon_32x32\@2x",
        256:  "icon_128x128\@2x",
        512:  "icon_256x256\@2x",
        1024: "icon_512x512\@2x"
    }
};

const source_image = process.argv[2];
const resize_set = process.argv[3];
const name = jsUtils.file.getNameFromPath(source_image);

function doImageResize(base64, size, filename) {
    image.resize(base64, size, function(data) {
        file.Base64ToFile(data, filename);
    });
}

function usage() {
    console.log("Usage:");
    console.log("    " + process.argv[1] + " source_image target");

    var key_str = "";
    const keys = Object.keys(target_size);
    for (var i=0; i<keys.length; i++) {
        key_str += key_str ? "/" : "";
        key_str += keys[i];
    }
    console.log("    target is [" + key_str + "]");
}

if (process.argv.length < 3) {
    usage();
    process.exit(1);
}

const base64 = file.addDataScheme(file.FileToBase64(source_image), 'image/png', 'base64');
image.getSize(base64, function(size) {
    console.log(size);
});

const select_size = target_size[resize_set] || parseInt(resize_set);
if (!select_size) {
    usage();
    process.exit(2);
}

if (typeof select_size === 'number') {
    doImageResize(base64, select_size, name.dirname + name.filename + "_" + select_size + ".png");
} else {
    const keys = Object.keys(select_size);
    for (var i=0; i<keys.length; i++) {
        doImageResize(base64, keys[i], select_size[keys[i]] + ".png");
    }
}
