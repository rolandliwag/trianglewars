function Alien(config) {
    this.layer = config.layer;

    this.id = config.id || 0;
    this.name = ko.observable(config.name);
    this.score = ko.observable(0);

    this.node = new Kinetic.Shape({
        x: config.x,
        y: config.y,
        radius: 40,
        sceneFunc: function(context) {
            context.beginPath();
            context.moveTo(25, 200);
            context.lineTo(105, 200);
            context.lineTo(60, 150);
            context.closePath();
            // KineticJS specific context method
            context.fillStrokeShape(this);
        },
        fill: '#00D2FF',
        stroke: 'black',
        strokeWidth: 4
    });

    this.layer.add(this.node);
}

Alien.prototype.draw = (function () {
    var accel = 0.05,
        velocity = 0,
        maxSpeed = 10;

    return function (frame) {

        this.node.move({
            y: 5
        });
    };
}());
