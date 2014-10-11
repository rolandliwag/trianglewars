function Backend(cb) {
    var socket = io();

    socket.on('connected', cb);

    socket.on('message', function (data) {
        console.log(data);
    });

    this.send = function (type, data) {
        socket.emit(type, data);
    };
};
