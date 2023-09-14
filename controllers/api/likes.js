const router = require('.');
const { like } = require('../models');

router.post('/like', async (req, res) => {
    try {
        const { userId, likedUserId } = req.body;

        //create like record
        await like.create({
            liker_id: userId,
            liked_user_id: likedUserId,
        });

        res.status(200).json({ message: "You've flagged down love!"});
    } catch (error) {
        console.error(err);
        res.status(500).json(err);
    }
});

module.exports = router;
