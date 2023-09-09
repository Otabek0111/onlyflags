//route for new users to create their account
//part of user authentication

const router = require('express').Router();
const { User } = require('../../models');

const bcrypt = require('bcrypt');

router.post('/createaccount', async (req, res) => {
    try {
        const existingUser = await User.findOne({ where: {email: req.body.email } });

        if (existingUser) {
            res.status(400).json({ message: 'Email is already in use' });
            return;
        }

        //generate a salt and hash user's password
        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hashedPassword = bcrypt.hashSync(req.body.password, salt);

        const newUser = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        });

        //log user in automatically after registration
        req.session.save(() => {
            req.sesion.user_id = newUser.id;
            req.session.logged_in = true;

            res.status(201).json({ user: newUser, message: 'Registration successful!', redirectTo: '/createprofileRoutes'})
        });
    } catch (err) {
        res.status(500).json(err);
    }
});