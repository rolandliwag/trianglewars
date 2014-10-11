function Backend(cb) {
    var socket = io();

    socket.on('newplayer', function (data) {
        events.trigger('newplayer', data);
        cb();
    });

    socket.on('newaliens', function (data) {
        events.trigger('newaliens', data);
        cb();
    });

    socket.on('playerupdate', function (playerData) {
        events.trigger('playerupdate', playerData);
    });

    this.send = function (type, data) {
        socket.emit(type, data);
    };
};
