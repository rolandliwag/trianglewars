/**
 * For making events.
 */
var events = (function () {
    var events = {
        // Client events
        'alienupdate': [],
        'playerupdate': [],
        'playeraction': [],
        'backendready': [],

        // Server events
        'newalien': [],
        'newplayer': [],
        'bullets': []
    };

    return {
        /**
         * Add an event handler
         */
        on: function (event, handler) {
            if (events[event]) {
                events[event].push(handler);
            }
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
        trigger: function (event) {
            if (events[event]) {
                events[event].forEach(function (handler) {
                    handler();
                });
            }
        }
    };
}());
