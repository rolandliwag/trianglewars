function Application() {
    var app = this;

    this.entities = [];
    this.gameloop = null;

    // Initialize backend connection
    this.backend = new Backend(function () {
        events.on('newplayer', app.addPlayer);
        app.backend.send('newplayer', localPlayer);

        events.on('newaliens', app.addAliens.bind(app));


        // Start the game loop
        app.gameloop.start();
    });

    // init the canvas layer
    this.stage = new Kinetic.Stage({
        container: 'play-area',
        width: 700,
        height: 800
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
    var app = this;
    $.each(aliens, function(index, alien){
        alien.layer = app.layer;
        app.entities.push(new Alien(alien));
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

$(function () {
    var app = new Application();
});
