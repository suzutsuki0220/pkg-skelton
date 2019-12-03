#!/usr/bin/env node

/* eslint no-console: "off" */

const jsUtils = require('./index.js');

const file = jsUtils.file;
const image = jsUtils.image;

const source = process.argv[2];
const angle = process.argv[3];

const name = jsUtils.file.getNameFromPath(source);

function usage() {
    console.log("Usage:");
    console.log("    " + process.argv[1] + " source_image angle");
}

if (process.argv.length < 3 || isNaN(angle)) {
    usage();
    process.exit(1);
}

const base64 = file.addDataScheme(file.FileToBase64(source), 'image/png', 'base64');

image.rotate(base64, jsUtils.angle.degToRad(angle), function(data) {
    file.Base64ToFile(data, name.dirname + name.filename + "-rotate" + angle + ".png");
});
