//users edit profile

const router = require('express').Router();
const { profile } = require('../models'); // imports profile model
const isAuthenticated = require('../utils/auth'); // Import the middleware

router.get('/editprofile', ensureAuthenticated, async (req, res) => {
    try {
        if (!req.isAuthenticated()) {
            return res.status(401).json({ error: 'Unauthorized' });

        }
        const user = req.user;

        res.render('profileEditForm', { user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal error" });
    }
});

//handle form submission & update profile
router.post('/editprofile', ensureAuthenticated, async (req, res) => {
    try {
        if (!req.isAuthenticated()) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const user = req.user;

        //ADD GENDER EVENTUALLY
        await profile.update(
            {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                pronouns: req.body.pronouns,
                age: req.body.age,
                location: req.body.location,
                green_flags: req.body.green_flags,
                yellow_flags: req.body.yellow_flags,
                red_flags: req.body.red_flags,
            },
            {
                where: { id: user.id },
            }
        );

        //redirect to profile page after editing
        res.redirect('/profile')
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        return res.status(401).json(err);
    }
}

module.exports = router;