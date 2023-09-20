const express = require('express');
const router = express.Router();
const { Sequelize } = require('../../config/connection');
const { account, like, profile } = require('../../models');
const isAuthenticated = require('../../utils/auth'); // Import the middleware

// Middleware to fetch the new profile
const fetchNewprofile = async (accountId, seenprofileId) => {
  try {
    const newprofile = await profile.findOne({
      where: {
        id: { [Sequelize.Op.notIn]: seenprofileId }, // Excludes liked or disliked profiles
      },
    });

    return newprofile;
  } catch (err) {
    throw err;
  }
};

// Route handler for liking a profile
router.post('/likes/:profileId', isAuthenticated, async (req, res) => {
  try {
    const { accountId } = req.body;

    // Create a like record
    await like.create({
      liker_id: accountId,
      liked_account_id: req.params.profileId,
      is_dislike: false,
    });

    // Fetch the new profile data
    const newprofile = await fetchNewprofile(accountId, [accountId]);

    if (!newprofile) {
      return res.status(404).json({ message: 'No more profiles available' });
    }

    // Render the matches.handlebars view and pass the new profile data
    res.render('matches', { newprofile });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Route handler for disliking a profile
router.delete('/likes/dislikes/:profileId', isAuthenticated, async (req, res) => {
  try {
    const { accountId } = req.body;

    const existingDislike = await like.findOne({
      where: {
        liker_id: accountId,
        liked_account_id: req.params.profileId,
        is_dislike: true,
      },
    });

    if (existingDislike) {
      return res.status(400).json({ message: 'You already disliked this profile' });
    }

    // Create a dislike record
    await like.create({
      liker_id: accountId,
      liked_account_id: req.params.profileId,
      is_dislike: true,
    });

    // Fetch the new profile data
    const newprofile = await fetchNewprofile(accountId);

    if (!newprofile) {
      return res.status(404).json({ message: 'No more profiles available' });
    }

    // Render the matches.handlebars view and pass the new profile data
    res.render('matches', { newprofile });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
