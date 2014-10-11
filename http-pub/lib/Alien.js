function Alien(config) {
    this.layer = config.layer;
    this.speed = config.speed;

    this.id = config.id || 0;
    this.name = ko.observable(config.name);
    this.score = ko.observable(0);

    this.node = new Kinetic.Shape({
        x: config.x,
        y: config.y,
        radius: 40,
        sceneFunc: function(context) {
            context.beginPath();
            context.moveTo(30, 50);
            context.lineTo(60, 0);
            context.lineTo(0, 0);
            context.closePath();
            context.fillStrokeShape(this);
        },
        fill: '#00D2FF',
        stroke: 'black',
        strokeWidth: 4
    });

    this.layer.add(this.node);
}

Alien.prototype.draw = function (frame) {
    this.node.move({
        x: 0,
        y: this.speed
    });
};

Alien.prototype.die = function () {
    this.node.destroy();
};

