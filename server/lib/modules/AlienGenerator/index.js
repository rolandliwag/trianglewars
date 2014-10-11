var Alien = require('./Alien.js'),
    _ = require('underscore');



function AlienGenerator() {
    var level = 1,
        levelInterval,
        alienInterval,
        started = false,
        allAlliens = [],
        allienMap = {};

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
                //ax = _.random(((level - 1) * 2) + 10, Math.pow(level * 5, 2) / 10);
                max = _.random(5, 10);

            for (var i = 0; i < max; i += 1) {
                var a = new Alien({level: level});
                aliens.push(a);
                allienMap[a.id] = a;
            }
            allAlliens = allAlliens.concat(aliens);
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

    this.updateAlliens = function (alliens) {
        alliens.forEach( function (aln) {
            var a = allienMap[aln.id];
            if(aln.health === 0) {
                var idx = allAlliens.indexOf(a);
                if(idx) {
                    allAlliens.splice(idx, 1);
                    delete allienMap[aln.id];
                }
            } else {
                a.health = aln.health;
                a.points = aln.points;
                a.speed = aln.speed;
            }
        });
    }

    this.getAlliens = function() {
        return allAlliens;
    }


};

module.exports = AlienGenerator;
