function Backend() {
    var socket = io();

    socket.on('connected', function (data) {
        events.trigger('backendready');
    });

    socket.on('message', function (data) {
        console.log(data);
    });
}
