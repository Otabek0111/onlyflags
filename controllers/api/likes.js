const express = require('express');
const router = express.Router();
const { Sequelize } = require('../../config/connection');
const { like, profile, account } = require('../../models');
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
    const accountId = req.account.id;

    const existingLike = await like.findOne({
      where: {
        liker_id: accountId,
        liked_account_id: req.params.profileId,
      },
    });
    if (existingLike) {
      return res.status(400).json({ message: 'You already liked this profile' });
    }

    // Create a like record
    await like.create({
      liker_id: accountId,
      liked_account_id: req.params.profileId,
      is_dislike: false,
    });

    // Fetch the new profile data
    const newprofile = await fetchNewprofile(accountId, [accountId, req.params.profileId]);

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
    const accountId = req.account.id;

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
    const newprofile = await fetchNewprofile(accountId, [accountId, req.params.profileId]);

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

router.get('/matches', isAuthenticated, async (req, res) => {
  try {    
    // Fetch the liked profiles
    const likes = await like.findAll({
      where: {
        liker_id: accountId,
        is_dislike: false,
      },
      include: { model: profile },
    });

    // Extract liked profiles
    const likedProfiles = likes.map(like => like.profile); // adapt it to your association
    
    // Render 'matches' view with likedProfiles
    res.render('matches', { likedProfiles });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
