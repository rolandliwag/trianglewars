var express = require('express'),
    compiless = require('express-compiless'),
    io = require('socket.io'),
    json = require('express-json');


function setUpSocketIO(app) {

    var server = require('http').createServer(app),
        io = require('socket.io')(server);

    io.on('connection', function (socket) {

        socket.on('message', function (data) {
            console.log('message:', data);
            socket.broadcast.emit('message', data);
        });


        socket.on('disconnect', function () {
            console.log('disconnect');
        });

        socket.broadcast.emit('connected', "hello world");
    });

    return server;
}

module.exports = function (config) {
    var app = express();

    app.use(json());

    app.all('/', function (req, res, next) {
        res.send('ok');
    });

    app.use(compiless({root: config.frontendPath}));
    app.use(express.static(config.frontendPath));

    return setUpSocketIO(app);
};


