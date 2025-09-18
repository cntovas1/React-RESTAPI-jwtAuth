const router = require("express").Router();
const pool = require('../../db');
const queries = require('./queries');
const bcrypt = require('bcrypt');
const jwtGenerator = require('./utils/jwtGenerator');
const validInfo = require("./middleware/validInfo");
const authorize = require("./middleware/authorize");


router.post("/register", validInfo, async (req, res) => {
    const { username, password, email } = req.body;
  
    try {
      const user = await pool.query(queries.checkUsernameExists, [
        username
      ]);
  
      if (user.rows.length > 0) {
        return res.status(401).json("User already exist!");
      }
  
      const salt = await bcrypt.genSalt(10);
      const bcryptPassword = await bcrypt.hash(password, salt);
  
      let newUser = await pool.query(
        queries.addUser,
        [username, bcryptPassword, email]
      );
  
      const jwtToken = jwtGenerator(newUser.rows[0].id);
  
      return res.json({ jwtToken });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  });

  router.post("/login", validInfo, async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const user = await pool.query(queries.getUsername, [
        username
      ]);
  
      if (user.rows.length === 0) {
        return res.status(401).json("Invalid Credential");
      }
  
      const validPassword = await bcrypt.compare(
        password,
        user.rows[0].password
      );
  
      if (!validPassword) {
        return res.status(401).json("Invalid Credential");
      }
      const jwtToken = jwtGenerator(user.rows[0].id);
      return res.json({ jwtToken });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  });

  router.get("/verify", authorize, (req, res) => {
    try {
      res.json(true);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  });



module.exports = router;