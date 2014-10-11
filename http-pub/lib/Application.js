function Application() {
    var app = this;

    this.entities = [];

    this.backend = new Backend();

    // Initialize modules/models
    this.players = ko.observableArray();
    this.players.push(new Player({type: 'local'}));

    // Start the game loop
    events.on('backendready', function () {
        app.lastFrameTime = Date.now();
        app.gameLoop = setInterval(function () {
            app.run();
            app.lastFrameTime = Date.now();
        }, 1000 / 60); // 60fps
    });

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
