const { Router } = require('express');
const controller = require('./controller');

const router = Router();

router.get('/:id/:game_name', controller.getScoreByUserID);
router.put('/:id/:game_name', controller.updateScore);
router.post('/:id/:game_name', controller.createScoreEntry);


module.exports = router;