var _ = require('underscore'),
    uniqueId = require('./uniqueId');

var playerSockets = {},
    playerGameStats = {};

function addPlayer(socket) {
    if(!socket.playerId) {
        socket.playerId = uniqueId.getNextPlayer();
        playerSockets[socket.playerId] = { playerId: socket.playerId, health: 10 } ;
    }
    return  playerSockets[socket.playerId];
}

function removePlayer(socket) {
    var player = playerSockets[socket.playerId];
    if (player) {
        delete playerSockets[socket.playerId];
        return player;
    }
    return false;
}

function getPlayer(socket) {
    return playerSockets[socket.playerId];
}

function clearAll() {
    playerSockets = {};
    playerGameStats = {};
}

function getAll() {
    var players = [];
    for(var s in playerSockets) {
        players.push(playerSockets[s]);
    }
    return players;
}

module.exports = {
    add : addPlayer,
    remove : removePlayer,
    get: getPlayer,
    clearAll: clearAll,
    getAll : getAll
};