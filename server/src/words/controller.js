const pool = require('../../db');
const queries = require('./queries');

const getWords = (req, res) =>{
    pool.query(queries.getWords, (error, results)=>{
        if(error) throw error;
        res.status(200).json(results.rows);
    });
};

const getWordById = (req, res) =>{
    const id = parseInt(req.params.id);
    pool.query(queries.getWordById, [id], (error, results) =>{
        if(error) throw error;
        res.status(200).json(results.rows);
    });
};

const addWord = (req, res) =>{
    const { word, is_real } = req.body; 
    //check for existing word
    pool.query(queries.checkWordExists, [word], (error, results) =>{
        if(results.rows.length){
            res.send('Word already exists.');
            return;
        }
        //add account
        pool.query(queries.addWord, [word, is_real], (error, results) =>{
            if (error) throw error;
            res.status(201).send('User created successfully!');
            return;
        })
    });
};

const deleteById = (req, res) =>{
    const id = parseInt(req.params.id);
    pool.query(queries.getWordById, [id], (error, results) =>{
        const noWordFound = !results.rows.length;
        if (noWordFound){
            res.send("Word does not exist.");
            return;
        }

        pool.query(queries.deleteById, [id], (error, results) =>{
            if (error) throw error;
            res.status(200).send('Word removed.');
            return;
        });
    });
};

const updateWord = (req, res) =>{
    const id = parseInt(req.params.id);
    const { word } = req.body;

    pool.query(queries.getWordById, [id], (error, results) =>{
        const noWordFound = !results.rows.length;
        if (noWordFound){
            res.send("Word does not exist.");
            return;
        }

        pool.query(queries.updateWord, [word, id], (error, results) =>{
            if (error) throw error;
            res.status(200).send('Word updated');
            return;
        });
    });
};


module.exports = {
    getWords,
    getWordById,
    addWord,
    deleteById,
    updateWord
};