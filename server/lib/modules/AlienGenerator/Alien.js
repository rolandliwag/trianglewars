var _ = require('underscore');

var uniqueID = 0;
/**
 * Represents an alien.
 * @param {Number} config.level An integer from 1-Infinity.
 */
function Alien(config) {
    // Generate alien properties based on config.level
    var level = config.level;

    this.x = _.random(10, 600);
    this.y = -150;
    this.id = ++uniqueID;
    this.speed = Math.min(1 + (level / 10), 10);
    this.health = _.random(100 + ((level - 1) * 10), 110 + ((level - 1) *20));
    this.points = Math.pow(level * 10, 2) / 10;
}

module.exports = Alien;
