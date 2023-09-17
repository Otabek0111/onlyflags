const dotenv = require('dotenv'); // Import .env
dotenv.config(); // Load variables from .env

const express = require('express');
const exphbs = require('express-handlebars');
const passport = require('./config/passport-config');
const sequelize = require('./config/connection');
const routes = require('./controllers');
const path = require('path'); // For Node.js
const session = require('express-session'); // Express.js

//const Account = require('./models/Account');
//const Profile = require('./models/Profile');
//const Like = require('./models/Like'); // Import the Like model

const app = express();
const PORT = process.env.PORT || 3000;

// Set up middleware with a secret key
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

// Parse JSON & URL-encoded request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize passport.js
app.use(passport.initialize());
app.use(passport.session());

// Define routes
app.use(routes);

app.get('./views/layouts', function (req, res) {
  res.render('main');
});

//router handler for dashboard page
app.get('/dashboard', (req, res) => {
  res.render('dashboard');
});
// Synchronize the Like model with the database
(async () => {
  try {
    await sequelize.sync({ force: false }); // Set force to true to drop and recreate the table
    console.log('Like table synchronized with the database.');
  } catch (error) {
    console.error('Error synchronizing Like table:', error);
  }

  // Start the server
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
  });
})();
