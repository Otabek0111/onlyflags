//users create profile

const router = require('express').Router();
//const { account, profile, like } = require('../../models/profile');
const profile = require('../../models/profile');

//GET request to display profile creation form

//POST request to handle form submission
class accountidGenerator {
    generateaccountId() {
        const randomNum = Math.floor(Math.random() * 1000); // Generate a random number between 0 and 100
        return randomNum;
}
   //test
}

const generator = new accountidGenerator();
const accountid = generator.generateaccountId();

router.post('/', async (req, res) => {
    try {
        //retrieve profile data from form submission

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
            image,
            // disliked_by_user_ids,
        } = req.body;

        //create new profile record in database
        const newprofile = await profile.create({
            id, 
            accountid,
            age,
            first_name,
            last_name,
            // gender,
            // pronouns,
            location,
            green_flag,
            yellow_flag,
            red_flag,
            image,
            // disliked_by_user_ids,
        });
        
        // //associate profile with account - is it necessary?
        // if (req.isAuthenticated() && req.account) {
        //     await newprofile.setaccount(req.account.id);
        // }

        //redirect to account's profile page (or another page, can change later)
        res.redirect('/dashboard/random');
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

module.exports = router;
