require('dotenv').config();
const express = require('express');
const app = express();
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('./config/passport'); // Import the passport instance

// Connect to MongoDB
connectDB();

// Set up EJS for templating
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));

// Set up session middleware before Passport initialization
app.use(session({
    secret: 'your_jwt_secret',
    resave: false,
    saveUninitialized: true // secure: false if not using HTTPS
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Define a root route
app.get('/', (req, res) => {
    res.redirect('/auth'); // Redirect to the auth page
});

// Routes
app.use('/', require('./routes/homeRoutes'))
app.use('/auth', require('./routes/authRoutes'));
app.use('/equipment', require('./routes/equipmentRoutes'));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
