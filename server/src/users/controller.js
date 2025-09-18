const pool = require('../../db');
const queries = require('./queries');

const getUsers = (req, res) =>{
    pool.query(queries.getUsers, (error, results)=>{
        if(error) throw error;
        res.status(200).json(results.rows);
    });
};

const getUserById = (req, res) =>{
    const id = parseInt(req.params.id);
    pool.query(queries.getUserById, [id], (error, results) =>{
        if(error) throw error;
        res.status(200).json(results.rows);
    });
};

const addUser = (req, res) =>{
    const { username, password, email } = req.body; 
    //check for existing account
    pool.query(queries.checkEmailExists, [email], (error, results) =>{
        if(results.rows.length){
            res.send('Email already exists.');
            return;
        }
        //add account
        pool.query(queries.addUser, [username, password, email], (error, results) =>{
            if (error) throw error;
            res.status(201).send('User created successfully!');
            return;
        })
    });
};

const deleteById = (req, res) =>{
    const id = parseInt(req.params.id);
    pool.query(queries.getUserById, [id], (error, results) =>{
        const noWordFound = !results.rows.length;
        if (noWordFound){
            res.send("User does not exist.");
            return;
        }

        pool.query(queries.deleteById, [id], (error, results) =>{
            if (error) throw error;
            res.status(200).send('User removed.');
            return;
        });
    });
};

const updateUser = (req, res) =>{
    const id = parseInt(req.params.id);
    const { username } = req.body;

    pool.query(queries.getUserById, [id], (error, results) =>{
        const noUserFound = !results.rows.length;
        if (noUserFound){
            res.send("User does not exist.");
            return;
        }

        pool.query(queries.updateUser, [username, id], (error, results) =>{
            if (error) throw error;
            res.status(200).send('User details updated');
            return;
        });
    });
};



module.exports = {
    getUsers,
    getUserById,
    addUser,
    deleteById,
    updateUser
};