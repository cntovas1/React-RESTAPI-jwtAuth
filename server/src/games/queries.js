const getGameId = 'SELECT id FROM games WHERE game_name = $1';

module.exports = {
    getGameId
}