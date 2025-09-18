const getWords = 'SELECT * FROM words';
const getWordById = 'SELECT * FROM words WHERE id = $1';
const checkWordExists = 'SELECT s FROM words s WHERE s.word = $1';
const addWord = 'INSERT INTO words (word, is_real) VALUES ($1, $2)';
const deleteById = 'DELETE FROM words WHERE id = $1';
const updateWord = 'UPDATE words SET word = $1 WHERE id = $2';

module.exports = {
    getWords,
    getWordById,
    checkWordExists,
    addWord,
    deleteById,
    updateWord,
};