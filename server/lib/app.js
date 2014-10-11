var express = require('express');

module.exports = function (config) {
    var app = express();

    app.all('/', function (req, res, next) {
        res.send('ok');
    });

    app.use(express.static(__dirname + "/../../http-pub"));

    return app;
};
