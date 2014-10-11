var Alien = require('./Alien.js'),
    _ = require('underscore');

function AlienGenerator() {
    var level = 1,
        levelInterval,
        alienInterval,
        started = false;

    // Begin the simulation
    this.begin = function () {
        var context = this;

        this.reset();

        // Increase level difficulty every 60secs
        levelInterval = setInterval(function () {
            level += 1;
        }, 60000);

        // Generate new aliens every 10secs
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

        started = true;
    };

    // Reset level to 1 and stop the simulation
    this.reset = function () {
        clearInterval(levelInterval);
        clearInterval(alienInterval);
        level = 1;
        started = false;
    };

    // Check simulation status
    this.started = function () {
        return started;
    };

    // This should be set
    this.onNewAliens = function () {};
};

module.exports = AlienGenerator;
