const express = require('express');
const router = express.Router();

// Home route
router.get('/', (req, res) => {
    if (!req.isAuthenticated()) {
        return res.redirect('/auth');  // Redirect to auth page if not authenticated
    }

    // Pass the user object to the 'home.ejs' view
    res.render('home', { user: req.user });
});

module.exports = router;
