//users create Profile

const router = require('express').Router();
//const { Account, Profile, Like } = require('../../models/Profile');
const Profile = require('../../models/Profile');

//GET request to display Profile creation form

//POST request to handle form submission

function generateAccountId() {
    const randomNum = Math.floor(Math.random() * 1000); // Generate a random number between 0 and 100
    return randomNum;
}
  

router.post('/', async (req, res) => {
    try {
        //retrieve Profile data from form submission

        const {
            id, 
            age,
            first_name,
            last_name,
            // gender,
            // pronouns,
            location,
            green_flag,
            yellow_flag,
            red_flag,
            // disliked_by_user_ids,
        } = req.body;

        const AccountId = req.session.account_id;
        //create new Profile record in database
        const newProfile = await Profile.create({
            id, 
            AccountId,
            age,
            first_name,
            last_name,
            // gender,
            // pronouns,
            location,
            green_flag,
            yellow_flag,
            red_flag,
            // disliked_by_user_ids,
        });
        
        // //associate Profile with Account - is it necessary?
        // if (req.isAuthenticated() && req.Account) {
        //     await newProfile.setAccount(req.Account.id);
        // }

        //redirect to Account's Profile page (or another page, can change later)
        res.redirect('/dashboard');
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

module.exports = router;
