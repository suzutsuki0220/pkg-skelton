module.exports.radToDeg = function(radian) {
    return radian * (180 / Math.PI)
};

module.exports.degToRad = function(degree) {
    return degree * (Math.PI / 180);
};
