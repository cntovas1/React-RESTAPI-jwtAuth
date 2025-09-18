const updateScore = 'UPDATE user_scores SET score = score + 1 WHERE game_name = $1 AND user_id = $2 RETURNING *';
const createScoreEntry = 'INSERT INTO user_scores (user_id, game_name, score) VALUES ($1, $2, 1)';
const getScore = 'SELECT score FROM user_scores WHERE user_id = $1 AND game_name = $2'; 

module.exports = {
    updateScore,
    createScoreEntry,
    getScore
};