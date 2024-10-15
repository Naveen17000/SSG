const express = require('express');
const router = express.Router();
const { login, signup } = require('../controllers/authController');

// GET login/signup page
router.get('/', (req, res) => {
    res.render('auth', { messages: req.flash('messages') });
});

// POST auth route for login/signup
router.post('/', async (req, res) => {
    const { action } = req.body;

    if (action === 'signup') {
        await signup(req, res);
    } else if (action === 'signin') {
        await login(req, res);
    } else {
        req.flash('messages', [{ category: 'error', message: 'Invalid action. Please try again.' }]);
        return res.redirect('/auth'); // Redirect back to the auth page with an error message
    }
});

// Export the router
module.exports = router;
