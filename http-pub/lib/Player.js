function Player(config) {
    this.layer = config.layer;

    this.name = ko.observable(config.name);
    this.score = ko.observable(0);

    this.node = new Kinetic.Circle({
        x: 100,
        y: 100,
        radius: 40,
        fill: 'red',
        stroke: 'black',
        strokeWidth: 5
    });
    this.layer.add(this.node);
}

Player.prototype.draw = function (frame) {
    this.node.move({
        x: 0.01 * frame.timeDiff,
        y: 0.05 * frame.timeDiff
    });
}
