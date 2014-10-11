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
            app.updatePlayer(data);
        });

        app.backend.send('newplayer', localPlayer);

        events.on('newaliens', app.addAliens);

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

Application.prototype.addAliens = function (aliens) {
    $.each(aliens, function(index, alien){
        alien.layer = APP.layer;
        APP.entities.push(new Alien(alien));
    });
};

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
    var player;

    this.entities.some(function (entity) {
        if (entity.id === data.id) {
            player = entity;
            return true;
        }
    });

    if (player) {
        player.update(data);
    }
};

var APP;

$(function () {
    APP = new Application();
});
