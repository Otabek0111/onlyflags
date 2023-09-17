const dotenv = require('dotenv'); // Import .env
dotenv.config(); // Load variables from .env

const express = require('express');
const exphbs = require('express-handlebars');
const passport = require('./config/passport-config');
const sequelize = require('./config/connection');
const routes = require('./controllers');
const path = require('path'); // For Node.js
const session = require('express-session'); // Express.js

const app = express();
const PORT = process.env.PORT || 3001;

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

//app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Parse JSON & URL-encoded request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize passport.js
app.use(passport.initialize());
app.use(passport.session());

// Define routes
app.use(routes);

app.get('/', function (req, res) {
  res.render('home');
});

// Sync database & start server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
  });
});