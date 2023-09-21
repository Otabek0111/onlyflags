//users edit profile

const router = require('express').Router();
const { account, profile, like } = require('../../models');
const isAuthenticated = require('../../utils/auth'); // Import the middleware

//handle form submission & update profile
router.post('/', ensureAuthenticated, async (req, res) => {
    try {
        await profile.update(
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
                where: { accountId: req.account.id },
            }
        );

        //redirect to profile page after editing
        res.redirect('/dashboard/random')
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