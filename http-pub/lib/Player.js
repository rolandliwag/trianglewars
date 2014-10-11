function Player(config) {
    this.layer = config.layer;

    this.id = config.id || 0;
    this.name = ko.observable(config.name);
    this.score = ko.observable(0);

    this.node = new Kinetic.Circle({
        x: this.id * 100,
        y: 660,
        radius: 40,
        fill: 'red',
        stroke: 'black',
        strokeWidth: 5
    });

    this.layer.add(this.node);
}

Player.prototype.draw = (function () {
    var accel = 0.01,
        speed = 0,
        speedIncrement = 0,
        maxSpeed = 5;

    return function (frame) {
        if (events.isKeyPressed('a') || events.isKeyPressed('d')) {
            speedIncrement = Math.max(speedIncrement + accel * frame.timeDiff);

            if (events.isKeyPressed('a')) {
                speed -= speedIncrement;
                speed = Math.max(-speedIncrement, -maxSpeed);
            } else {
                speed += speedIncrement;
                speed = Math.min(speedIncrement, maxSpeed);
            }
        } else {
            speedIncrement = 0;
            speed = 0;
        }

        this.node.move({
            x: speed,
            y: 0
        });
    };
}());
