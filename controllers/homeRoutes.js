const router = require('express').Router();
const { account, profile, like } = require('../models');
const isAuthenticated = require('../utils/auth'); // Import the middleware
const profilesData = require('../seeds/profile-seeds'); // Import your data

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
      return next();
  } else {
      return res.status(401).json({ error: 'Unauthorized' });
  }
}

router.get('/', (req, res) => {
  res.render('home');
});

router.get('/createaccount', (req, res) => {
  res.render('createaccount'); // Use the correct handlebars file name
});

router.get('/profileCreate', (req, res) => {
  res.render('profileCreate');
});

router.get('/existingaccount/login', (req, res) => {
  res.render('signin');
});

router.get('/dashboard', async (req, res) => {
  try {
    // Fetch all profiles from the database
    const profilesData = await profile();
    
    const profiles = profilesData.map((profile) => profile.get({ plain: true }));
    
    console.log(profiles);

    // Render the 'dashboard' template and pass the 'profiles' data to it
    res.render('dashboard', { profiles });
  } catch (error) {
    // Handle any errors that occur during the database query
    console.error('Error fetching profiles:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/matches', (req, res) => {
  res.render('matches');
});

router.get('/profileUpdate', (req, res) => {
  res.render('profileUpdate');
});

router.get('/editprofile', ensureAuthenticated, async (req, res) => {
  try {
      const profileData = await profile.findOne({ where: {accountId: req.user.id} });

      if (!profileData) {
          return res.status(404).json({ error: 'profile not found' });
      }

      const profile = profileData.get({ plain: true });
      res.render('profileUpdate', { profile });

  } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal error" });
  }
});

router.get('/home', async (req, res) => {
  try {
    // Get all accounts, sorted by name
    const accountData = await account.findAll({
      attributes: { exclude: ['password'] },
      order: [['name', 'ASC']],
    });

    // Serialize account data so templates can read it
    const accounts = accountData.map((account) => account.get({ plain: true }));

    // Pass serialized data into Handlebars.js template
    res.render('homepage', { accounts });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;