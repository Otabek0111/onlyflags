//route for new users to create their account

const router = require('express').Router();
const { User } = require('../../models');

router.post('/createaccount', async (req, res) => {
    try {
        const existingUser = await User.findOne({ where: {email: req.body.email } });

        if(e)
    }
})