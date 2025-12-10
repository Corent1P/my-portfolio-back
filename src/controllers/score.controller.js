
const Score = require('../models/score.model');

exports.saveScore = async (req, res) => {
    try {
        const { game, score, playerName, email } = req.body;

        if (!game || score === undefined || !email || !playerName) {
            return res.status(400).json({ error: 'Missing game, score, email, or playerName' });
        }

        const newScore = new Score({
            email,
            playerName,
            game,
            score,
            timestamp: new Date()
        });

        await newScore.save();

        res.status(201).json({ message: 'Score saved successfully', score: newScore });

    } catch (error) {
        console.error('Error saving score:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getTopScores = async (req, res) => {
    try {
        const { gameId } = req.params;

        if (!gameId) {
            return res.status(400).json({ error: 'Missing gameId' });
        }

        const scores = await Score.find({ game: gameId })
            .sort({ score: -1 }) // Descending order
            .limit(10)
            .select('playerName score timestamp');

        res.status(200).json(scores);
    } catch (error) {
        console.error('Error fetching scores:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
