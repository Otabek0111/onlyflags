// route for existing Accounters to login & log out
//part of user authentication
const router = require('express').Router();
const { Account, Like, Profile } = require('../../models');

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const AccountData = await Account.findOne({ where: { email } });

    if (!AccountData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await AccountData.checkPassword(password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
    }

    req.session.save(() => {
      req.session.Account_id = AccountData.id;
      req.session.logged_in = true;
      
      res.json({ Account: AccountData, message: 'You are now logged in!' });
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/existingAccount/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(200).json({ message: 'Successfully logged out'} );
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;