const express = require('express');
const router = express.Router();
const scoresRouter = require('./scores');

router.use('/scores', scoresRouter);

module.exports = router;
