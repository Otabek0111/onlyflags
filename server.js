const express = require('express');
const exphbs = require('express-handlebars');
const passport = require('./config/passport-config');
const sequelize = require('./config/connection');
const routes = require('./controllers');
const path = require('path'); //for node.js
const session = require('express-session');//express.js
const dotenv = require('dotenv'); // import .env

dotenv.config(); //load variables from .env

const app = express();
const PORT = process.env.PORT || 3001;

//Set up middleware with secret key
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

//serve static files
app.use(express.static(path.join(__dirname, 'public')));

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

//parse JSON & URL-encoded request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//initialize passport.js
app.use(passport.initialize());
app.use(passport.session());

//define routes
app.use(routes);

app.get('/', function (req, res) {
    res.render('home');
});

//sync database & start server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => {
      console.log(`App listening on port http://localhost:${PORT}`);
    });
  });
