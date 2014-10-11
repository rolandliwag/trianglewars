var express = require('express');

module.exports = function (config) {
    var app = express();

    app.all('/', function (req, res, next) {
        res.send('ok');
    });

    app.use('/static', express.static(__dirname + "/../../public"));

    return app;
};
