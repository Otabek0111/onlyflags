const router = require('express').Router();
const { Account, Profile, Like } = require('../models');
const isAuthenticated = require('../utils/auth'); // Import the middleware
const ProfilesData = require('../seeds/profile-seeds'); // Import your data

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

router.get('/createAccount', (req, res) => {
  res.render('createAccount'); // Use the correct handlebars file name
});

router.get('/ProfileCreate', (req, res) => {
  res.render('ProfileCreate');
});

router.get('/existingAccount/login', (req, res) => {
  res.render('signin');
});

router.get('/dashboard', async (req, res) => {
  try {
    // Fetch all Profiles from the database
    const Profiles = await Profile.findAll();

    // Render the 'dashboard' template and pass the 'Profiles' data to it
    res.render('dashboard', { Profiles });
  } catch (error) {
    // Handle any errors that occur during the database query
    console.error('Error fetching Profiles:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/matches', (req, res) => {
  res.render('matches');
});

router.get('/ProfileUpdate', (req, res) => {
  res.render('ProfileUpdate');
});

router.get('/editProfile', ensureAuthenticated, async (req, res) => {
  try {
      const ProfileData = await Profile.findOne({ where: {AccountId: req.user.id} });

      if (!ProfileData) {
          return res.status(404).json({ error: 'Profile not found' });
      }

      const Profile = ProfileData.get({ plain: true });
      res.render('ProfileUpdate', { Profile });

  } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal error" });
  }
});

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