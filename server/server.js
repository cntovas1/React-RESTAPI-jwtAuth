const express = require('express');
const usersRoutes = require('./src/users/routes');
const wordsRoutes = require('./src/words/routes');
const registerRoutes = require('./src/jwtAuth/controller');
const dashboardRoutes = require('./src/dashboard/controller');
const scoreRoutes = require('./src/score/routes');
const gamenameidRoutes = require('./src/games/routes');
const app = express();
const cors = require("cors");
const port = 5000;

const corsOptions ={
   origin:'*', 
   credentials:true,            
   optionSuccessStatus:200,
}

app.use(cors(corsOptions))

app.use(express.json());

app.use('/api/v1/users', usersRoutes);
app.use('/api/v1/words', wordsRoutes);
app.use('/api/v1/auth', registerRoutes);
app.use('/api/v1/dashboard', dashboardRoutes);
app.use('/api/v1/score', scoreRoutes);
app.use('/api/v1/gamenameid', gamenameidRoutes)

app.listen(port, () => console.log(`app listening on port ${port}`));