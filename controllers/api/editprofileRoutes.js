//users edit profile

const router = require('express').Router();
const { profile } = require('../models'); // imports profile model
const isAuthenticated = require('../utils/auth'); // Import the middleware

// retrive & display profile editing form
router.get('/editprofile', async (req, res) => {
    try {
        //MAKE SURE USER IS AUTHENTICATED
        const user = req.user;

        res.render('profileEditForm', { user });
    } catch (err) {
    res.status (500).json({ error: "Internal error"});
    }
});

//handle form submission & update profile
router.post('/editprofile', async (req, res) => {
    try {
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
        res.redirect('profile')
    } catch (err) {
    res.status(500).json(err);
    }
});

module.exports = router;