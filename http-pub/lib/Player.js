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

Player.prototype.draw = (
    var accel = 0.05,
        velocity = 0,
        maxSpeed = 10;

    return function (frame) {
        var x = 0;

        if (events.isKeyPressed('a')) {
            x = -0.1 * frame.timeDiff;
        } else if (events.isKeyPressed('d')) {
            x = 0.1 * frame.timeDiff;
        }

        this.node.move({
            x: x,
            y: 0
        });
    };
}
