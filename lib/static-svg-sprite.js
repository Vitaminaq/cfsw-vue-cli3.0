const express = require('express');
const path = require('path');

// 用于生成svg-sprite
module.exports = (app) => {
    app.use('/svg-sprite.js', express.static(
        path.join(__dirname, 'svg-sprite.js')
    ));
}