var express = require('express'),
    compiless = require('express-compiless'),
    io = require('socket.io'),
    json = require('express-json'),
    AlienGenerator = require('./modules/AlienGenerator');

function setUpSocketIO(app) {
    var server = require('http').createServer(app),
        io = require('socket.io')(server),
        generator;

    function beginAlienSimulation() {
        if (!generator) {
            // Begin alien population
            generator = new AlienGenerator();
            generator.onNewAliens = function (aliens) {
                console.log('New aliens generated: ' + aliens.length);

                io.emit('newaliens', aliens);
            };
            generator.begin();
        }
    }

    io.on('connection', function (socket) {
        beginAlienSimulation();

        socket.on('message', function (data) {
            console.log('message:', data);
            socket.broadcast.emit('message', data);
        });

        socket.emit('connected', "hello world");
        socket.broadcast.emit('connected', "hello world");
    });

    return server;
}


module.exports = function (config) {
    var app = express();

    app.use(json());
    app.use(compiless({root: config.frontendPath}));
    app.use(express.static(config.frontendPath));

    return setUpSocketIO(app);
};




