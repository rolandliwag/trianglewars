function Backend(cb) {
    var socket = io();

    socket.on('newplayer', function (data) {
        events.trigger('newplayer', data);
        cb();
    });

    socket.on('message', function (data) {
        console.log(data);
    });

    socket.on('newaliens', function (data) {
        events.trigger('newaliens', data);
    });

    this.send = function (type, data) {
        socket.emit(type, data);
    };
};
