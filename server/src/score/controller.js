const pool = require('../../db');
const queries = require('./queries');

const updateScore = (req, res) =>{
    const user_id = parseInt(req.params.id);
    const game_name = parseInt(req.params.game_name);

        pool.query(queries.updateScore, [game_name, user_id], (error, results) =>{
            const noEntryFound = !results.rows.length
            if(noEntryFound){
                res.status(404).send('No entry');
                return;
            }else{
                res.status(200).send('Score updated.');
                return;
            }
        });
        

};

const createScoreEntry = (req, res) =>{
    const user_id = parseInt(req.params.id);
    const game_name = parseInt(req.params.game_name);
    
    pool.query(queries.createScoreEntry, [user_id, game_name], (error, results) =>{
        if(error) throw error;
        res.status(201).send('Score entry created');
        return;
    })
}

const getScoreByUserID = (req, res) => {
    const user_id = parseInt(req.params.id);
    const game_name = parseInt(req.params.game_name);

    pool.query(queries.getScore, [user_id, game_name], (error, results) =>{
        if(error) throw error;
        res.status(200).json(results.rows);
    })
};

module.exports = {
    updateScore,
    getScoreByUserID,
    createScoreEntry
};