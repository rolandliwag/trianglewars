function Player(config) {
    this.layer = config.layer;

    this.id = config.id || 0;
    this.name = ko.observable(config.name);
    this.type = config.type;
    this.score = ko.observable(0);

    this.speed = 0;
    this.speedIncrement = 0;

    // So we don't flood the backend with reqs
    this.bufferedInterval = null;

    var color = ['red', 'blue', 'orange', 'purple'];

    this.node = new Kinetic.Circle({
        x: this.id * 100,
        y: 560,
        radius: 20,
        fill: color[config.id] || 'orange',
        stroke: 'black',
        strokeWidth: 5
    });

    this.layer.add(this.node);
}

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

    this.node.move({
        x: this.speed,
        y: 0
    });

    // Buffered position update to other clients
    this.doBufferedUpdate();
};

Player.prototype.drawRemote = function (frame) {
};

Player.prototype.doBufferedUpdate = function () {
    var player = this;

    // So we don't flood the server
    if (!this.bufferedInterval) {
        console.log(this.bufferedInterval);
        this.bufferedInterval = setTimeout(function () {
            player.bufferedInterval = null;
            APP.backend.send('playerupdate', {
                health: 100,
                score: player.score(),
                position: {
                    x: player.node.offsetX(),
                    y: player.node.offsetY(),
                    speed: player.speed
                }
            });
        }, 300);
    }
};dd
