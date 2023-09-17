//both the like and dislike routes will return new Profile

const router = require('express').Router();
const { Sequelize } = require('../../config/connection');
const { like, Profile } = require('../models');
const isAuthenticated = require('../utils/auth'); // Import the middleware

router.use(async (req, res, next) => {
    if (req.session && req.session.Account_id) {
        const Account = await Account.findbyPk(req.session.Account_id);
        req.Account = Account ? { id: Account.id } : null;
    }
    next();
})

// function to fetch new Profile

const fetchNewProfile = async (AccountId, seenProfileId) => {
    try {
        const newProfile = await Profile.findOne({
            where: {
                id: { [Sequelize.Op.notIn]: seenProfileId }, // excludes liked or disliked Profiles
            },
        });

        return newProfile;
    } catch (err) {
        throw err;
    }
};

router.use(isAuthenticated);

router.get('/new', async (req, res) => {
    try {
        const newProfile = await fetchNewProfile(req.Account.id, [req.Account.id]);

        if (!newProfile) {
            return res.status(404).json({ message: 'No more Profiles available' });
        }

        res.json({ Profile: newProfile });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

router.post('/likes/:ProfileId', async (req, res) => {
    try {
        const { AccountId } = req.body;

        //create like record
        await like.create({
            liker_id: AccountId,
            liked_Account_id: req.params.ProfileId,
            is_dislike: false
        });

        const newProfile = await fetchNewProfile(AccountId, [AccountId]);

        if (!newProfile) {
            return res.status(404).json({ message: 'No more Profiles available' });
        }

        res.status(200).json({ message: "You've flagged down love!" });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

router.delete('/likes/:ProfileId', async (req, res) => {
    try {
        const { AccountId } = req.body;

        const existingDislike = await like.findOne({
            where: {
                liker_id: AccountId,
                liked_Account_id: req.params.ProfileId,
                is_dislike: true
            },
        });

        if (existingDislike) {
            return res.status(400).json({ message: 'You already disliked this Profile'})
        }

        await like.create({
            liker_id: AccountId,
            liked_Account_id: req.params.ProfileId,
            is_dislike: true,
        });

        const newProfile = await fetchNewProfile(AccountId);

        if (!newProfile) {
            return res.status(404).json({ message: 'No more Profiles available' });
        }

        res.status(200).json('Profile disliked');
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

module.exports = router;
