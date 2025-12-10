const express = require('express');
const { verifySupabaseUser } = require('../middleware/verifyUser.js');
const scoreController = require('../controllers/score.controller.js');

const router = express.Router();

router.post('/', verifySupabaseUser, scoreController.saveScore);
router.get('/:gameId', scoreController.getTopScores);

module.exports = router;
