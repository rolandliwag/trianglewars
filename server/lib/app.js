var express = require('express'),
    compiless = require('express-compiless'),
    io = require('socket.io'),
    json = require('express-json'),
    players = require('./players');
    AlienGenerator = require('./modules/AlienGenerator');

function setUpSocketIO(app) {
    var server = require('http').createServer(app),
        io = require('socket.io')(server),
        numActiveSockets = 0,
        generator = new AlienGenerator();

    function beginAlienSimulation() {
        if (!generator.started()) {
            console.log('Starting alien simulator');

            // Begin alien population
            generator.onNewAliens = function (aliens) {
                console.log('New aliens generated: ' + aliens.length);

                io.emit('newaliens', aliens);
            };
            generator.begin();
        }
    }

    io.on('connection', function (socket) {
        numActiveSockets += 1;

        beginAlienSimulation();

        socket.on('message', function (data) {
            console.log('message:', data);
            socket.broadcast.emit('message', data);
        });

        //player arrived
        var you = players.add(socket);
        var others = players.getAll();
        socket.emit('newplayer', { you: you, others: others } );
        socket.broadcast.emit('newplayer', { others: others } );

        //player gone
        socket.on('disconnect', function () {
            var p = players.remove(socket);
            console.log('disconnect', p);

            numActiveSockets -= 1;
            if (numActiveSockets === 0) {
                console.log('0 players connected. Ending simulation');
                generator.reset();
                players.clearAll();
            }
        });

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




