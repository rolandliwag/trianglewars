function Application() {
    var app = this;

    this.entities = [];

    // Initialize modules/models


    // Start the game loop
    this.lastFrameTime = Date.now();
    this.gameLoop = setInterval(function () {
        app.run();
        app.lastFrameTime = Date.now();
    }, 1000 / 60); // 60fps
}

Application.prototype.run = function () {
    var timeNow = Date.now();

    this.entities.forEach(function (entity) {
        entity.draw(timeNow);
    });
};

Application.prototype.end = function () {
    clearInterval(this.gameLoop);
};

$(function () {
    var app = new Application();
});
