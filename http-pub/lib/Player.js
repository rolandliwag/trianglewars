function Player(config) {
    this.layer = config.layer;

    this.playerId = config.playerId;
    this.name = ko.observable(config.name);
    this.type = config.type;
    this.score = ko.observable(0);
    this.health = ko.observable(config.health || 100);

    this.speed = 0;
    this.speedIncrement = 0;

    // So we don't flood the backend with reqs
    this.bufferedInterval = null;

    var color = ['red', 'blue', 'orange', 'purple'];

    this.node = new Kinetic.Circle({
        x: (this.playerId % 4) * 100,
        y: 560,
        radius: 20,
        fill: color[config.playerId] || 'orange',
        stroke: 'black',
        strokeWidth: 5
    });

    this.x = config.x;
    this.y = config.y;

    this.layer.add(this.node);
}

Player.prototype.update = function (data) {
    this.score(data.score);
    this.name(data.name);
    this.health(data.health);
    this.speed = data.position.speed;
    this.x = data.position.x;
    this.y = data.position.y;
};

Player.prototype.draw = function (frame) {
    if (this.type === 'local') {
        this.drawLocal(frame);
    } else {
        this.drawRemote(frame);
    }
};

Player.prototype.drawLocal = function (frame) {
    var accel = 0.01,
        maxSpeed = 5;

    if (events.isKeyPressed('a') || events.isKeyPressed('d')) {
        this.speedIncrement = this.speedIncrement + accel * frame.timeDiff;

        if (events.isKeyPressed('a')) {
            this.speed -= this.speedIncrement;
            this.speed = Math.max(-this.speedIncrement, -maxSpeed);
        } else {
            this.speed += this.speedIncrement;
            this.speed = Math.min(this.speedIncrement, maxSpeed);
        }
    } else {
        this.speedIncrement = 0;
        this.speed = 0;
    }

    var x = this.node.getPosition().x;

    if (x < -10) {
        this.x = 0;
        this.speed = 0;
        this.speedIncrement = 0;
        this.node.offsetX(0);
    } else if (x > 710) {
        this.x = 700;
        this.speed = 0;
        this.speedIncrement = 0;
        this.node.offsetX(700);
    } else {
        this.node.move({
            x: this.speed,
            y: 0
        });
    }

    // Buffered position update to other clients
    this.doBufferedUpdate();
};

Player.prototype.drawRemote = function (frame) {
    var x = this.node.getPosition().x;

    if (x < -10) {
        this.x = 0;
        this.node.offsetX(0);
    } else if (x > 710) {
        x = 700;
        this.x = 700;
        this.node.offsetX(700);
    } else {
        this.node.move({
            x: this.speed,
            y: 0
        });
    }
};

Player.prototype.doBufferedUpdate = function () {
    var player = this;

    // So we don't flood the server
    if (!this.bufferedInterval && this.hasAnythingChanged()) {
        this.bufferedInterval = setTimeout(function () {
            var position = player.node.getPosition();

            player.bufferedInterval = null;
            APP.backend.send('playerupdate', {
                health: 100,
                score: player.score(),
                position: {
                    x: position.x,
                    y: position.y,
                    speed: player.speed
                }
            });
        }, 300);
    }
};

Player.prototype.hasAnythingChanged = function () {
    var newValues = '' + this.health() + this.score() + this.node.getPosition().x + this.node.offsetY() + this.speed,
        thingsChanged = false;

    if (newValues !== this.lastValues) {
        thingsChanged = true;
    }

    this.lastValues = newValues;

    return thingsChanged;
};
