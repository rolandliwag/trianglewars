var express = require('express');

module.exports = function (config) {
    var app = express();

    app.all('/', function (req, res, next) {
        res.send('ok');
    });

    return app;
};
