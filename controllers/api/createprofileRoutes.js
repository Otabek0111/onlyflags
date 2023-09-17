//users create Profile

const router = require('express').Router();
const { Profile } = require('../models');

//GET request to display Profile creation form

router.get('/create', (req, res) => {
    res.render('ProfileCreateForm');
});

//POST request to handle form submission

router.post('/create', async (req, res) => {
    try {
        //retrieve Profile data from form submission
        //add gender eventually

        const {
            id, 
            AccountId,
            first_name,
            last_name,
            pronouns,
            age,
            location,
            green_flag,
            yellow_flag,
            red_flag,
            image, 
            disliked_by_user_ids,
        } = req.body;

        //create new Profile record in database
        const newProfile = await Profile.create({
            id, 
            AccountId,
            first_name,
            last_name,
            pronouns,
            age,
            location,
            green_flag,
            yellow_flag,
            red_flag,
            image, 
            disliked_by_user_ids,
        });
        
        //associate Profile with Account - is it necessary?
        if (req.isAuthenticated() && req.Account) {
            await newProfile.setAccount(req.Account.id);
        }

        //redirect to Account's Profile page (or another page, can change later)
        res.redirect('/Profile');
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

module.exports = router;
