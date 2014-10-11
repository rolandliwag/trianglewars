/**
 * For making events.
 */
var events = (function () {
    var events = {};

    var pressed = {};

    // Global keyboard event tracking
    $(window).on('keydown', function (evt) {
        var char = String.fromCharCode(evt.keyCode).toUpperCase();

        pressed[char] = true;
    });

    $(window).on('keyup', function (evt) {
        var char = String.fromCharCode(evt.keyCode).toUpperCase();

        pressed[char] = false;
    });

    return {
        /**
         * Add an event handler
         */
        on: function (event, handler) {
            events[event] = events[event] || [];
            events[event].push(handler);
        },

        /**
         * Remove an event handler
         */
        un: function (event, handler) {
            if (events[event]) {
                var index = events[event].indexOf(handler);
                if (index !== -1) {
                    events[event].splice(index, 1);
                }
            }
        },

        /**
         * Trigger all handlers of an event.
         */
        trigger: function (event, data) {
            console.log(event + ' triggered');
            if (events[event]) {
                events[event].forEach(function (handler) {
                    handler(data);
                });
            }
        },

        isKeyPressed: function (key) {
            return pressed[key.toUpperCase()];
        }
    };
}());
