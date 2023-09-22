const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { account } = require('../models');

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email', // Change 'emailField' to 'usernameField'
      passwordField: 'password',
    },
    async (email, password, done) => {
      try {
        const account = await account.findOne({ where: { email } });

        if (!account) {
          return done(null, false, { message: 'Incorrect email' });
        }

        const validPassword = await account.checkPassword(password);

        if (!validPassword) {
          return done(null, false, { message: 'Incorrect password' });
        }

        return done(null, account);
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.serializeUser((account, done) => {
  done(null, account.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const account = await account.findByPk(id);
    done(null, account);
  } catch (err) {
    done(err);
  }
});

module.exports = passport;
