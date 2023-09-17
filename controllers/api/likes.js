//both the like and dislike routes will return new profile

const router = require('.');
const { Sequelize } = require('../../config/connection');
const { like, profile } = require('../models');

// function to fetch new profile

const fetchNewProfile = async (userId) => {
    try {
        const newProfile = await profile.findOne({
            where: {
                id: { [Sequelize.Op.notIn]: userId }, // excludes liked or disliked profiles
            },
        });

        return newProfile;
    } catch (err) {
        throw err;
    }
};

router.get('/new', async (req, res) => {
    try {
        const newProfile = await fetchNewProfile(req.user.id);

        if (!newProfile) {
            return res.status(404).json({ message: 'No more profiles available' });
        }

        res.json({ profile: newProfile });
    } catch (error) {
        console.error(err);
        res.status(500).json(err);
    }
});

router.post('/like', async (req, res) => {
    try {
        const { userId, likedUserId } = req.body;

        //create like record
        await like.create({
            liker_id: userId,
            liked_user_id: likedUserId,
        });

        const newProfile = await fetchNewProfile(userId);

        if (!newProfile) {
            return res.status(404).json({ message: 'No more profiles available' });
        }

        res.status(200).json({ message: "You've flagged down love!" });
    } catch (error) {
        console.error(err);
        res.status(500).json(err);
    }
});

router.post('/dislike/:profileId', async (req, res) => {
    try {
        const { profileId } = req.params;
        const { userId } = req.body;

        const existingDislike = await like.findOne({
            where: {
                liker_id: userId,
                liked_user_id: profileId,
                is_dislike: true
            },
        });

        if (existingDislike) {
            return console.log("You already disliked this profile");
        }

        await like.create({
            liker_id: userId,
            liked_user_id: profileId,
            is_dislike: true,
        });

        const newProfile = await fetchNewProfile(userId);

        if (!newProfile) {
            return res.status(404).json({ message: 'No more profiles available' });
        }

        res.status(200).console.log('Profile disliked');
    } catch (error) {
        console.error(err);
        res.status(500).json(err);
    }
});

module.exports = router;
