
const mongoose = require('mongoose');
const Score = require('./src/models/score.model');
require('dotenv').config();

// Connect to Mongo
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB')
        verify().then(() => {
            mongoose.disconnect();
            console.log('Done.');
        });
    })
    .catch(err => {
        console.error('Mongo Error:', err);
        process.exit(1);
    });

async function verify() {
    // Supabase check removed as backend no longer relies on it
    console.log('Skipping Supabase Connection Check (Managed on Frontend)...');

    console.log('Checking Models...');
    try {
        const scoreCount = await Score.countDocuments();
        console.log('Score count:', scoreCount);

        const testScore = new Score({
            email: 'test@example.com',
            playerName: 'Test Player',
            game: 'test-game',
            score: 123
        });
        // await testScore.save(); 
        console.log('Score model initialized successfully.');
    } catch (e) {
        console.error('Model verification failed:', e);
    }
}

// verify(); // Do not autorun, just defining it.
// We will rely on manual test or just inspection as I cannot easily fake a Supabase JWT here without login credentials.
