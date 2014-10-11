function Application() {
    var app = this;

    this.entities = [];
    this.gameloop = null;

    // Initialize backend connection
    this.backend = new Backend(function () {
        events.on('newplayer', function (data) {
            app.addPlayer(data);
        });
        events.on('playerupdate', function (data) {
            app.backend.send('playerupdate', data);
        });

        app.backend.send('newplayer', localPlayer);

        // Start the game loop
        app.gameloop.start();
    });

    // init the canvas layer
    this.stage = new Kinetic.Stage({
        container: 'play-area',
        width: 700,
        height: 600
    });

    this.layer = new Kinetic.Layer();
    this.stage.add(this.layer);

    this.gameloop = new Kinetic.Animation(function (frame) {
        app.run(frame);
    }, this.layer);

    // Initialize models
    var localPlayer = new Player({
        type: 'local',
        name: 'Me',
        layer: this.layer
    });
    this.players = ko.observableArray([localPlayer]);
    this.entities.push(localPlayer);

    ko.applyBindings(this);
}

Application.prototype.run = function (frame) {
    this.entities.forEach(function (entity) {
        entity.draw(frame);
    });
};

Application.prototype.end = function () {
    this.gameloop.stop();
};

Application.prototype.addPlayer = function (config) {
    this.entities.push(new Player({
        type: 'remote',
        name: config.name,
        id: config.id,
        layer: this.layer
    }));
};

Application.prototype.updatePlayer = function (data) {

};

var APP;

$(function () {
    APP = new Application();
});
