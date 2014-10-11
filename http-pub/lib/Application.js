function Application() {
    var app = this;

    this.entities = [];

    this.backend = new Backend();

    // Initialize modules/models
    var localPlayer = new Player({
        type: 'local',
        name: 'Me'
    });
    this.players = ko.observableArray([localPlayer]);
    this.players.push();

    // Start the game loop
    events.on('backendready', function () {
        events.on('newplayer', app.addPlayer);

        app.backend.send('newplayer', localPlayer);
        app.lastFrameTime = Date.now();
        app.gameLoop = setInterval(function () {
            app.run();
            app.lastFrameTime = Date.now();
        }, 1000 / 60); // 60fps
    });
    this.backend.init();

    ko.applyBindings(this);
}

Application.prototype.run = function () {
    var timeNow = Date.now();

    this.entities.forEach(function (entity) {
        entity.draw(timeNow);
    });
};

Application.prototype.end = function () {
    clearInterval(this.gameLoop);
};

$(function () {
    var app = new Application();
});
