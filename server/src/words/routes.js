const { Router } = require('express');
const controller = require('./controller');

const router = Router();

router.get('/', controller.getWords);
router.get('/:id', controller.getWordById);
router.post('/', controller.addWord);
router.put('/:id', controller.updateWord);
router.delete('/:id', controller.deleteById);


module.exports = router;