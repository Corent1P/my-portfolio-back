const mongoose = require('mongoose');

const ScoreSchema = new mongoose.Schema({
    email: { type: String, required: true },
    playerName: { type: String, required: true },
    game: { type: String, required: true },
    score: { type: Number, required: true },
    timestamp: { type: Date, default: Date.now }
}, { collection: 'scoreboard' });

module.exports = mongoose.model('Score', ScoreSchema);
