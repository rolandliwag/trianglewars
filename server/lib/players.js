var _ = require('underscore'),
    uniqueId = require('./uniqueId');
    var DEF_HEALTH = 10,
        DEF_SCORE = 0;

var playerSockets = {},
    playerGameStats = {};

function addPlayer(socket) {
    if(!socket.playerId) {
        socket.playerId = uniqueId.getNextPlayer();
        playerSockets[socket.playerId] = { playerId: socket.playerId, health: DEF_HEALTH , score: DEF_SCORE } ;
    }
    return  playerSockets[socket.playerId];
}

function updatePlayer(socket, data) {
    var player = getPlayer(socket);
    if (player) {
        player.position = data.position;
        player.health =  data.health;
        player.score =  data.score;
        playerSockets[player.playerId] = player;
    }
    return player;
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
}

function getAll() {
    var players = [];
    for(var s in playerSockets) {
        players.push(playerSockets[s]);
    }
    return players;
}


function getCount() {
    return Object.keys(playerSockets).length;
}

module.exports = {
    add : addPlayer,
    remove : removePlayer,
    get: getPlayer,
    clearAll: clearAll,
    getAll : getAll,
    update : updatePlayer,
    count : getCount
};