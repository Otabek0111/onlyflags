//users edit Profile

const router = require('express').Router();
const { Profile, Account } = require('../models'); // imports Profile model
const isAuthenticated = require('../utils/auth'); // Import the middleware

router.get('/editProfile', ensureAuthenticated, async (req, res) => {
    try {
        const ProfileData = await Profile.findOne({ where: {AccountId: req.user.id} });

        if (!ProfileData) {
            return res.status(404).json({ error: 'Profile not found' });
        }

        const Profile = ProfileData.get({ plain: true });
        res.render('ProfileEditForm', { Profile });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal error" });
    }
});

//handle form submission & update Profile
router.post('/editProfile', ensureAuthenticated, async (req, res) => {
    try {
        await Profile.update(
            {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                pronouns: req.body.pronouns,
                age: req.body.age,
                gender: req.body.gender,
                location: req.body.location,
                green_flags: req.body.green_flags,
                yellow_flags: req.body.yellow_flags,
                red_flags: req.body.red_flags,
            },
            {
                where: { AccountId: req.Account.id },
            }
        );

        //redirect to Profile page after editing
        res.redirect('/Profile')
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        return res.status(401).json({ error: 'Unauthorized' });
    }
}

module.exports = router;