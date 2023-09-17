//route for new folks to create their Account
//part of user authentication

const router = require('express').Router();
const { Account } = require('../../models');
const bcrypt = require('bcrypt');

router.post('/createAccount', async (req, res) => {
    try {
        const existingUser = await Account.findOne({ where: { email: req.body.email } });

        if (existingUser) {
            return res.status(400).json({ message: 'Email is already in use' });
        }

        //generate a salt and hash password
        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hashedPassword = bcrypt.hashSync(req.body.password, salt);

        const newUser = await Account.create({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        });

        //log in automatically after registration
        req.session.save(() => {
            req.session.user_id = newUser.id;
            req.session.logged_in = true;

            //make sure redirectTo is the actual path
            res.status(201).json({
                Account: newUser,
                message: 'Registration successful!',
                redirectTo: '/createProfileRoutes',
            });
        });
    } catch (err) {
        console.error(err);
        if (err.name === 'SequelizeValidationError') {
            return res.status(400);
        }
        res.status(500).json(err);
    }
});

module.exports = router;