const express = require('express');
const exphbs = require('express-handlebars');

const sequelize = require('./config/connection');
const routes = require('./controllers');
const path = require('path'); //for node.js
const session = require('express-session');//express.js

const app = express();
const PORT = process.env.PORT || 3001;

//HAVE TO SET UP SESSION MIDDLEWARE AND SECURE A SECRET KEY
//app.use(
  //session.......
//)
//TODO: Don't forget to configure your app to accept JSON
app.use(express.static(path.join(__dirname, 'public')));

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

//TODO: Use the Express Router for more detailed routes

app.get('/', function (req, res) {
    res.render('home');
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

//app.use(passport.initialize()) -- WHEN MAKE PASSPORT JS
//app.use(passport.session()) -- WHEN MAKE PASSPORT JS

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => {
      console.log(`App listening on port http://localhost:${PORT}`);
    });
  });
