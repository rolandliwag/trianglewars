function Application() {
    var app = this;

    this.localPlayer = null;
    this.entities = [];
    this.gameloop = null;

    // Initialize events
    events.on('newplayer', function (data) {
        app.addPlayer(data);
    });
    events.on('playerupdate', function (data) {
        app.updatePlayer(data);
    });
    events.on('newaliens', app.addAliens);

    events.on('allienupdate', function (data) {
        app.removeAliens(data);
    });

    // Initialize backend connection
    this.backend = new Backend(function () {

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
    this.players = ko.observableArray([]);

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
    var me = config.you,
        others = config.others;

    if (me) {
        this.localPlayer = new Player({
            type: 'local',
            name: 'Me',
            playerId: me.playerId,
            health: me.health,
            score: me.score,
            layer: this.layer
        });

        this.entities.push(this.localPlayer);
    }

    others.forEach(function (player) {
        /*
        if (this.entities.some(function (entity) {
            return entity.playerId === player.playerId;
                })) {
        } {
            // player already added
            return;
        }*/

        console.log('Player ' + player.playerId + ' added');

        if (player.playerId !== this.localPlayer.playerId) {
            this.entities.push(new Player({
                type: 'remote',
                name: 'Player ' + player.playerId,
                playerId: player.playerId,
                health: player.health,
                score: player.score,
                layer: this.layer,
                x: player.position ? player.position.x : 0,
                y: player.position ? player.position.y : 0
            }));
        }
    }, this);
};

Application.prototype.updatePlayer = function (data) {
    var player;

    this.entities.some(function (entity) {
        if (entity.playerId === data.playerId) {
            player = entity;
            return true;
        }
    });

    if (player) {
        player.update(data);
    }
};

Application.prototype.killAliensAt = function (x) {
    var aliensKilled = [];

    this.entities.forEach(function (entity) {
        if (!('id' in entity)) {
            // Not an alien
            return;
        }

        var xAlien = entity.node.x();

        if (x > xAlien - 25 && x < xAlien + 25) {
            console.log('alien dead');
            entity.die();
            aliensKilled.push(entity);
        }
    });

    var aliensJson = [];
    aliensKilled.forEach(function (alien) {
        this.entities.splice(this.entities.indexOf(alien), 1);
        aliensJson.push({
            id: alien.id,
            health: 0
        });
    }, this);

    if (aliensJson.length) {
        this.backend.send('allienupdate', aliensJson);
    }
};

Application.prototype.removeAliens = function (aliens) {
    var aliensKilled = [];

    aliens.forEach(function (alien) {
        this.entities.forEach(function (entity) {
            if (alien.id === entity.id) {
                entity.die();
                aliensKilled.push(entity);
            }
        });
    }, this);

    aliensKilled.forEach(function (alien) {
        this.entities.splice(this.entities.indexOf(alien), 1);
    }, this);
};

var APP;

$(function () {
    APP = new Application();
});



