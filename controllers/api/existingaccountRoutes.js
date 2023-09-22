// route for existing accounters to login & log out
//part of user authentication
const router = require('express').Router();
const { account } = require('../../models');

router.post('/', async (req, res) => {
  try {
    const accountData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = accountData.id;
      req.session.logged_in = true;

      res.status(200).json(accountData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const accountData = await account.findOne({ where: { email: req.body.email } });

    if (!accountData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await accountData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
    }

    req.session.save(() => {
      req.session.account_id = accountData.id;
      req.session.logged_in = true;
      
      res.json({ account: accountData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(201).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;