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
            context.moveTo(25, 200);
            context.lineTo(105, 200);
            context.lineTo(60, 150);
            context.closePath();
            context.fillStrokeShape(this);
        },
        fill: '#00D2FF',
        stroke: 'black',
        strokeWidth: 4
    });

    this.layer.add(this.node);
}

Alien.prototype.draw = (function () {
    return function (frame) {
        this.node.move({
            x: 0,
            y: this.speed
        });
    };
}());
