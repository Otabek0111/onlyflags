const express = require('express');
const router = express.Router();
const { Sequelize } = require('../../config/connection');
const { Account, Like, Profile } = require('../../models');
const isAuthenticated = require('../../utils/auth'); // Import the middleware

// Middleware to fetch the new profile
const fetchNewProfile = async (AccountId, seenProfileId) => {
  try {
    const newProfile = await Profile.findOne({
      where: {
        id: { [Sequelize.Op.notIn]: seenProfileId }, // Excludes liked or disliked Profiles
      },
    });

    return newProfile;
  } catch (err) {
    throw err;
  }
};

// Route handler for liking a profile
router.post('/likes/:ProfileId', isAuthenticated, async (req, res) => {
  try {
    const { AccountId } = req.body;

    // Create a like record
    await like.create({
      liker_id: AccountId,
      liked_Account_id: req.params.ProfileId,
      is_dislike: false,
    });

    // Fetch the new profile data
    const newProfile = await fetchNewProfile(AccountId, [AccountId]);

    if (!newProfile) {
      return res.status(404).json({ message: 'No more Profiles available' });
    }

    // Render the matches.handlebars view and pass the new profile data
    res.render('matches', { newProfile });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Route handler for disliking a profile
router.delete('/likes/:ProfileId', isAuthenticated, async (req, res) => {
  try {
    const { AccountId } = req.body;

    const existingDislike = await like.findOne({
      where: {
        liker_id: AccountId,
        liked_Account_id: req.params.ProfileId,
        is_dislike: true,
      },
    });

    if (existingDislike) {
      return res.status(400).json({ message: 'You already disliked this Profile' });
    }

    // Create a dislike record
    await like.create({
      liker_id: AccountId,
      liked_Account_id: req.params.ProfileId,
      is_dislike: true,
    });

    // Fetch the new profile data
    const newProfile = await fetchNewProfile(AccountId);

    if (!newProfile) {
      return res.status(404).json({ message: 'No more Profiles available' });
    }

    // Render the matches.handlebars view and pass the new profile data
    res.render('matches', { newProfile });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
