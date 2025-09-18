const { Router } = require('express');
const controller = require('./controller');

const router = Router();

router.get('/:game_name', controller.getGameId);



module.exports = router;