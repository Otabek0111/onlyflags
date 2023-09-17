const router = require('express').Router();
const { Account } = require('../models');
const isAuthenticated = require('../utils/auth'); // Import the middleware

router.get('/home', async (req, res) => {
  try {
    // Get all Accounts, sorted by name
    const AccountData = await Account.findAll({
      attributes: { exclude: ['password'] },
      order: [['name', 'ASC']],
    });

    // Serialize Account data so templates can read it
    const Accounts = AccountData.map((Account) => Account.get({ plain: true }));

    // Pass serialized data into Handlebars.js template
    res.render('homepage', { Accounts });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;