function Backend(cb) {
    var socket = io();

    socket.on('sorry', function (data) {
        console.log('sorry', data);
        events.trigger('sorry', data);
        cb();
    });

    socket.on('playergone', function (data) {
        console.log('playergone', data);
        events.trigger('playergone', data);
        cb();
    });

    socket.on('newplayer', function (data) {
        events.trigger('newplayer', data);
        console.log('newplayer', data);
        cb();
    });

    socket.on('newaliens', function (data) {
        events.trigger('newaliens', data);
        cb();
    });

    socket.on('allienupdate', function (data) {
        events.trigger('allienupdate', data);
    });

    socket.on('playerupdate', function (playerData) {
        events.trigger('playerupdate', playerData);
    });


    this.send = function (type, data) {
        socket.emit(type, data);
    };
};
