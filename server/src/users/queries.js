const getUsers = 'SELECT * FROM users';
const getUserById = 'SELECT * FROM users WHERE id = $1';
const checkEmailExists = 'SELECT s FROM users s WHERE s.email = $1';
const addUser = 'INSERT INTO users (username, password, email) VALUES ($1, $2, $3)';
const deleteById = 'DELETE FROM users WHERE id = $1';
const updateUser = 'UPDATE users SET username = $1 WHERE id = $2';

module.exports = {
    getUsers,
    getUserById,
    checkEmailExists,
    addUser,
    deleteById,
    updateUser
};