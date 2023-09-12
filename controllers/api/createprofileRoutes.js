//users create profile

const router = require('express').Router();
const { profile } = require('../models');

//GET request to display profile creation form

router.get('/create', (req, res) => {
    res.render('profileCreateForm');
});

//POST request to handle form submission

router.post('/create', async (req, res) => {
    try {
        //retrieve profile data from form submission
        //add gender eventually
        const {
            first_name,
            last_name,
            pronouns,
            age,
            location,
            green_flags,
            yellow_flags,
            red_flags
        } = req.body;

        //create new profile record in database
        const newProfile = await profile.create({
            first_name,
            last_name,
            pronouns,
            age,
            location,
            green_flags,
            yellow_flags,
            red_flags,
        });
        //associate profile with user - is it necessary?
        if (req.isAuthenticated()) {
            const user = req.user;
            await newProfile.setUser(user);
        }

        //redirect to user's profile page (or another page, can change later)
        res.redirect('/profile');
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

module.exports = router;
