const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { User } = require('./models');

passport.use(
    new LocalStrategy(
      {
        usernameField: 'username',
        passwordField: 'password',
      },
      async (username, password, done) => {
        try {
          const user = await User.findOne({ where: { username }});
  
        if (!user) {
          return done(null, false, { message: 'Incorrect username'});
        }
  
        const validPassword = await user.checkPassword(password);
  
        if (!validPassword) {
          return done(null, false, { message: 'Incorrect password'})
        }
  
        return done(null, user);
        } catch (err) {
          return done(err);
        }
      }
    )
  );
  
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findByPk(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });

  module.exports = passport;