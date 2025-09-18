const pool = require('../../db');
const queries = require('./queries');

const getGameId = (req, res) => {
    const game_name = req.params.game_name;
    pool.query(queries.getGameId, [game_name], (error, results) =>{
        if(error) throw error;
        res.status(200).json(results.rows)

    })
    
}

module.exports = {
    getGameId
};