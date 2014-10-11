var express = require('express'),
    compiless = require('express-compiless');

module.exports = function (config) {
    var app = express();

    app.use(compiless({root: config.frontendPath}));
    app.use(express.static(config.frontendPath));

    return app;
};
