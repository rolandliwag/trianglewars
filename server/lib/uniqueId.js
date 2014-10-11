/**
 * Created by ashish on 10/11/14.
 */

var playerId  = 0;
var allienId  = 0;

module.exports = {

    getNextPlayer: function () {
        ++playerId;
        return playerId;
    },

    getNextAllien: function () {
        ++allienId;
        return allienId;
    }
}
