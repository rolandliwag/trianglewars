var Alien = require('./Alien.js'),
    _ = require('underscore');

function AlienGenerator() {
    var level = 1,
        levelInterval,
        alienInterval;

    this.begin = function () {
        interval = setInterval(function () {
            level += 1;
        }, 60000);
    };

    this.reset = function () {
        clearInterval(interval);
        clearInterval(alienInterval);
        level = 0;
    };

    // This should be set
    this.onNewAliens = function () {};

    var context = this;
    alienInterval = setInterval(function () {
        var aliens = [],
            max = _.random(((level - 1) * 2) + 10, Math.pow(level * 5, 2) / 10);

        for (var i = 0; i < max; i += 1) {
            aliens.push(new Alien({
                level: level
            }));
        }

        context.onNewAliens(aliens);
    }, 10000);
};

module.exports = AlienGenerator;
