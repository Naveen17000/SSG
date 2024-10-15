const User = require('../models/User'); // Assuming you have a User model
const bcrypt = require('bcrypt');
const passport = require('passport'); // If you're using Passport for authentication

// Signup function
const signup = async (req, res) => {
    const { username, email, password } = req.body;

    // Basic validation
    if (!email || !password || !username) {
        req.flash('messages', [{ category: 'error', message: 'All fields are required.' }]);
        return res.redirect('/auth');
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            req.flash('messages', [{ category: 'error', message: 'Email already exists.' }]);
            return res.redirect('/auth');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();

        req.logIn(newUser, (err) => {
            if (err) {
                req.flash('messages', [{ category: 'error', message: 'Error logging in after signup.' }]);
                return res.redirect('/auth');
            }
            req.flash('messages', [{ category: 'success', message: 'Account created successfully!' }]);
            return res.redirect('/home');
        });
    } catch (error) {
        console.error(error);
        req.flash('messages', [{ category: 'error', message: 'Error creating account.' }]);
        res.redirect('/auth');
    }
};

// Login function
const login = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            req.flash('messages', [{ category: 'error', message: 'Invalid email or password.' }]);
            return res.redirect('/auth');
        }
        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }
            res.redirect('/home'); // Redirect to the dashboard or home page after successful login
        });
    })(req, res, next);
};

module.exports = { login, signup };