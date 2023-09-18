//users edit Profile

const router = require('express').Router();
const { Account, Profile, Like } = require('../../models');
const isAuthenticated = require('../../utils/auth'); // Import the middleware

//handle form submission & update Profile
router.post('/', ensureAuthenticated, async (req, res) => {
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