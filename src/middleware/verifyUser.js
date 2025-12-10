
const { supabase } = require('../config/supabase');

const verifySupabaseUser = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ error: 'No token provided. Cannot verify user existence.' });
        }

        const { data: { user }, error } = await supabase.auth.getUser(token);

        if (error || !user) {
            console.error('Auth verification failed:', error);
            return res.status(401).json({ error: 'Invalid token. User does not exist in Supabase.' });
        }

        // Optional: Ensure the email in the token matches the email in the body (if provided)
        // This prevents a valid user from submitting scores for another email.
        if (req.body.email && user.email !== req.body.email) {
            return res.status(403).json({ error: 'Token email does not match provided email.' });
        }

        req.user = user;
        next();
    } catch (err) {
        console.error('Middleware error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { verifySupabaseUser };
