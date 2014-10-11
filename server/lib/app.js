var express = require('express'),
    compiless = require('express-compiless'),
    io = require('socket.io'),
    json = require('express-json'),
    players = require('./players');



function setUpSocketIO(app) {

    var server = require('http').createServer(app),
        io = require('socket.io')(server);

    io.on('connection', function (socket) {

        socket.on('message', function (data) {
            console.log('message:', data);
            socket.broadcast.emit('message', data);
        });

        //player arrived
        var you = players.add(socket);
        var others = players.getAll();
        socket.emit('newPlayer', { you: you, others: others } );
        socket.broadcast.emit('newPlayer', { others: others } );

        //player gone
        socket.on('disconnect', function () {
            var p = players.remove(socket);
            console.log('disconnect', p);
        });
    });

    return server;
}


module.exports = function (config) {
    var app = express();

    app.use(json());
    app.use(compiless({root: config.frontendPath}));
    app.use(express.static(config.frontendPath));

    app.get('/', function (req, res, next) {
        res.send('ok');
    });

    return setUpSocketIO(app);
};




