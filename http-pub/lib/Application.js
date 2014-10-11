function Application() {
    var app = this;

    this.entities = [];

    // Initialize modules/models
    var localPlayer = new Player({
        type: 'local',
        name: 'Me'
    });
    this.players = ko.observableArray([localPlayer]);

    // Initialize backend connection
    this.backend = new Backend(function () {
        events.on('newplayer', app.addPlayer);
        app.backend.send('newplayer', localPlayer);

        // Start the game loop
        app.lastFrameTime = Date.now();
        app.gameLoop = setInterval(function () {
            app.run();
            app.lastFrameTime = Date.now();
        }, 1000 / 60); // 60fps
    });

    // init the canvas layer
    this.stage = new Kinetic.Stage({
        container: 'play-area',
        width: 700,
        height: 800
    });

    this.layer = new Kinetic.Layer();

    this.entities.push(new Ship(app));

    ko.applyBindings(this);
}

Application.prototype.run = function () {
    var timeNow = Date.now();

    this.entities.forEach(function (entity) {
        entity.draw(timeNow);
    });

    this.stage.add(this.layer);
};

Application.prototype.end = function () {
    clearInterval(this.gameLoop);
};

$(function () {
    var app = new Application();
});



function Ship(app) {
    this.app = app;
    this.currentShip = new Kinetic.Circle({
        x : 100,
        y : 770,
        radius: 20,
        fill: 'red',
        stroke: 'black',
        strokeWidth: 5
    });
}

Ship.prototype.draw = function () {
    this.app.layer.add(this.currentShip);
};