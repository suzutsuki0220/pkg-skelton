const value = require('./value');

function makeCanvas(size) {
    if (typeof document === 'undefined') {
        const { createCanvas } = require('canvas');
        return createCanvas(size.width, size.height);
    } else {
        return document.createElement('canvas');
    }
}

function makeImage() {
    const i = (typeof document === 'undefined') ? require('canvas').Image : document.Image;
    return new i();
}

module.exports.isValidSize = function(size) {
    if (size && isNaN(size.width) === false && isNaN(size.height) === false) {
        if (size.width > 0 && size.height > 0) {
            return true;
        }
    }

    return false;
};

// 画像が横長であるか
module.exports.isLandscape = function(size) {
    return (size.width >= size.height) ? true : false;
};

// 画像が縦長であるか
module.exports.isPortrait = function(size) {
    if (size.width === size.height) {
        return true;
    }

    return !(this.isLandscape(size));
};

module.exports.getCenterXY = function(size) {
    return {
        x: Math.floor(size.width / 2),
        y: Math.floor(size.height / 2)
    };
};

module.exports.getAreaSize = function(size) {
    if (this.isValidSize(size) === false) {
        return 0;
    }

    return size.width * size.height;
};

module.exports.getAspect = function(size) {
    const ratio = value.getGcd(size.width, size.height);
    if(ratio != 0) {
        return {
            x: size.width  / ratio,
            y: size.height / ratio
        };
    }

    return null;
};

// 指定された枠組みに収まる最大のサイズ
module.exports.getMaximumFitSize = function(source_size, area_size) {
    const scale_w = area_size.width / source_size.width;
    const scale_h = area_size.height / source_size.height;

    return this.getScaledSize(source_size, Math.min(scale_w, scale_h));
};

// 中心に表示するための画像の配置位置(x,y)
module.exports.getCenteringPositionXY = function(source_size, area_size) {
    const source_area = this.getCenterXY(source_size);
    const center_area = this.getCenterXY(area_size);

    return {
        x: center_area.x - source_area.x,
        y: center_area.y - source_area.y
    };
};

module.exports.getScale = function(src_size, target_dimension) {
    if (this.isValidSize(src_size) === false) {
        return 0;
    }

    if (src_size.width > src_size.height) {
        return target_dimension / src_size.width;
    } else {
        return target_dimension / src_size.height;
    }
};

module.exports.getScaledSize = function(src_size, scale) {
    var ret = {width: 0, height: 0};

    if (this.isValidSize(src_size) === true) {
        ret.width  = Math.floor(src_size.width * scale);
        ret.height = Math.floor(src_size.height * scale);
    }

    return ret;
};

module.exports.getSize = function(base64image, callback) {
    const image = makeImage();
    image.crossOrigin = "Anonymous";
    image.onload = function(event) {
        callback({width: image.width, height: image.height});
    };
    image.src = base64image;
};

module.exports.resize = function(base64image, target_dimension, callback, mime_type) {
    const self = this;

    const image = makeImage();
    image.crossOrigin = "Anonymous";
    image.onload = function(event) {
        const scale = self.getScale(image, target_dimension);
        const dst_size = self.getScaledSize(image, scale);
        const canvas = makeCanvas(dst_size);
        var ctx = canvas.getContext('2d');
        ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, dst_size.width, dst_size.height);
        callback(canvas.toDataURL(mime_type));
    };
    image.src = base64image;
};
